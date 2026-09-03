#!/usr/bin/env python3
"""Exercise PatchNotes' browser-only evidence and reflection path locally."""
from __future__ import annotations

import functools
import http.server
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
PORT = 8795


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_args: object) -> None:
        pass


def start_server() -> tuple[http.server.ThreadingHTTPServer, threading.Thread]:
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, thread


def main() -> None:
    server, thread = start_server()
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1280, "height": 720})
            page.goto(f"http://127.0.0.1:{PORT}/", wait_until="networkidle")

            page.get_by_role("button", name="Load sample").click()
            assert page.locator("#files-count").inner_text() == "1 file"
            assert page.locator("#added").inner_text() == "2"
            assert page.locator("#removed").inner_text() == "1"
            assert "notes.js" in page.locator("#files").inner_text()
            assert page.locator("#files-count").get_attribute("aria-live") == "polite"
            assert page.locator("#claim-state").get_attribute("aria-live") == "polite"

            hostile = (
                'diff --git a/<img src=x onerror=alert(1)> '
                'b/<img src=x onerror=alert(2)>\n'
                '--- a/old\n+++ b/new\n@@ -1 +1 @@\n-old\n+new\n'
            )
            page.locator("#diff").fill(hostile)
            page.get_by_role("button", name="Analyze change").click()
            assert page.locator("#files img").count() == 0
            assert "<img" in page.locator("#files").inner_text()

            page.locator("#change-note").fill("I made the change visible as evidence.")
            page.locator("#learn-note").fill("I tested the parser with a hostile filename.")
            page.get_by_role("button", name="Mark reflection written").click()
            assert page.locator("#claim-state").inner_text() == "written by author"
            browser.close()
    finally:
        server.shutdown()
        thread.join(timeout=2)
    print("PatchNotes UI smoke: OK")


if __name__ == "__main__":
    main()
