const diffInput = document.querySelector("#diff");
const sampleButton = document.querySelector("#sample");
const analyzeButton = document.querySelector("#analyze");
const filesOutput = document.querySelector("#files");
const filesCount = document.querySelector("#files-count");
const sampleDiff = `diff --git a/notes.js b/notes.js\nindex 1234567..89abcde 100644\n--- a/notes.js\n+++ b/notes.js\n@@ -1,3 +1,5 @@\n export function summarize(items) {\n-  return items.join(", ");\n+  const clean = items.filter(Boolean);\n+  return clean.join(", ");\n }`;

function parseDiff(text) {
  const lines = text.split("\n");
  const files = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (match) { current = { name: match[2], added: 0, removed: 0, hunks: 0 }; files.push(current); continue; }
    if (!current) continue;
    if (line.startsWith("@@")) current.hunks += 1;
    else if (line.startsWith("+") && !line.startsWith("+++")) current.added += 1;
    else if (line.startsWith("-") && !line.startsWith("---")) current.removed += 1;
  }
  return files;
}

function renderEvidence() {
  const files = parseDiff(diffInput.value);
  const added = files.reduce((sum, file) => sum + file.added, 0);
  const removed = files.reduce((sum, file) => sum + file.removed, 0);
  document.querySelector("#added").textContent = added;
  document.querySelector("#removed").textContent = removed;
  filesCount.textContent = `${files.length} ${files.length === 1 ? "file" : "files"}`;
  filesOutput.replaceChildren();
  if (!files.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No unified diff file headers found.";
    filesOutput.append(empty);
    return;
  }
  for (const file of files) {
    const row = document.createElement("div");
    row.className = "file";
    const name = document.createElement("strong");
    name.textContent = file.name;
    const details = document.createElement("span");
    details.textContent = `${file.added} added · ${file.removed} removed · ${file.hunks} hunk${file.hunks === 1 ? "" : "s"}`;
    row.append(name, details);
    filesOutput.append(row);
  }
}

sampleButton.addEventListener("click", () => { diffInput.value = sampleDiff; renderEvidence(); });
analyzeButton.addEventListener("click", renderEvidence);
document.querySelector("#save").addEventListener("click", () => {
  const hasText = document.querySelector("#change-note").value.trim() && document.querySelector("#learn-note").value.trim();
  document.querySelector("#claim-state").textContent = hasText ? "written by author" : "needs both notes";
});
renderEvidence();

// Demo mode keeps the real controls visible while staging a repeatable recording.
if (new URLSearchParams(window.location.search).get("demo") === "1") {
  window.setTimeout(() => sampleButton.click(), 700);
  window.setTimeout(() => {
    document.querySelector("#change-note").value = "I added a small parser that turns one input change into visible evidence.";
    document.querySelector("#learn-note").value = "I tested how file headers and line prefixes become a concise explanation.";
    document.querySelector("#analyze").click();
  }, 1500);
  window.setTimeout(() => document.querySelector("#save").click(), 2300);
}
