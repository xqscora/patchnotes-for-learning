# PatchNotes for Learning · Submission Draft

> Local copy of the project payload. The FirstCommit Devpost draft now exists; final submission is still unclaimed.

## Project name

PatchNotes for Learning

## Tagline

Make your code changes explainable to yourself.

## Description

PatchNotes for Learning turns a pasted unified diff into traceable evidence for a beginner's own reflection. It extracts changed files, additions, deletions, and hunk counts, then places that evidence beside two author-written prompts: what changed, and what was learned or tested.

The tool deliberately does not generate a learning story, grade the author, read a local repository, or upload code. It keeps the claim with the person who made the change and keeps the diff visible as evidence.

## Problem

Beginners often know that their code changed but struggle to explain what they learned. A generic assistant can produce a polished explanation that the author does not understand. PatchNotes takes a smaller approach: expose the concrete change and ask the author to connect it to their own words.

## How it works

1. Paste one unified diff or load the included sample.
2. Analyze the diff locally in the browser.
3. Inspect changed files, added lines, removed lines, and hunks.
4. Write an author reflection beside the evidence.
5. Mark the reflection as written by the author.

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Browser DOM APIs
- No external data, APIs, accounts, or package installation

## AI-use disclosure

AI coding assistance was used while drafting the HTML, CSS, JavaScript, and documentation. The final submission must name the exact tools used and identify AI-assisted sections. The project owner remains responsible for reviewing and explaining the implementation.

## Demo outline

Show the sample diff, analyze it, point to the file and line counts, write a short reflection, and explain why the tool refuses to invent the author's learning claim.

## Suggested screenshots

- `screenshot_empty.jpg` — clean first state before a diff is loaded.
- `screenshot_reflection.jpg` — analyzed sample with evidence counts and an author-written reflection.

## Public demo

- Live demo: `https://xqscora.github.io/patchnotes-for-learning/`
- Source: `https://github.com/xqscora/patchnotes-for-learning`
- The live demo is a preview aid; FirstCommit still requires a separate 3–5 minute demo video.

## Remaining before submission

- [x] Confirm the FirstCommit build window and reread live rules.
- [x] Create a Cora-owned public repository for this project only.
- [x] Capture a real 3–5 minute demo video.
- [x] Capture two real browser screenshots locally.
- [x] Add the repository, video, and two screenshots to the Devpost draft; photo IDs `5250226` and `5250227` were observed.
- [x] Verify the project was created as the FirstCommit draft `1162099` during the current event window.
- [ ] Save the edited project-details page after action-time confirmation.
- [ ] Accept the terms and perform the final Devpost submission after action-time confirmation.
