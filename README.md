# PatchNotes for Learning

PatchNotes for Learning turns a code diff into evidence a beginner can explain. It keeps the changed lines visible, counts the change, and asks the author to connect the change to a concrete learning claim.

## What it does

- Accepts a pasted unified diff.
- Extracts changed files, additions, deletions, and changed-line locations.
- Shows an evidence panel beside reflection prompts.
- Marks a reflection as author-written instead of inventing a learning story.

This is a learning-evidence tool, not an AI tutor, code reviewer, or automatic assessment system.

## Run

Open `index.html` in a modern browser. No server or package installation is required.

The repository includes a GitHub Pages deployment workflow. The live URL is `https://xqscora.github.io/patchnotes-for-learning/` once deployment succeeds; verify it before using it in a submission.

## Scope and privacy

The prototype runs entirely in the browser. It does not read a local Git repository, upload code, call an API, or retain a pasted diff after the page is closed.

## AI-use disclosure

AI coding assistance was used while drafting the HTML, CSS, JavaScript, and documentation. The final submission must name the exact tools used and identify AI-assisted sections. The project owner remains responsible for understanding and reviewing the implementation.

## Status

Independent FirstCommit prototype. It is not Signal Commons, Cogram, CogPace, Cerome, FocusField, or Overload Compass.
