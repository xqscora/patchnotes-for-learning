$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$app = Get-Content -Raw -LiteralPath (Join-Path $root 'app.js')

if ($app -match 'filesOutput\.innerHTML') {
  throw 'Unsafe HTML interpolation remains in app.js.'
}
if ($app -notmatch 'name\.textContent\s*=\s*file\.name') {
  throw 'File names are not rendered through textContent.'
}
if ($app -notmatch 'filesOutput\.replaceChildren\(\)') {
  throw 'Evidence output is not cleared safely before rendering.'
}

node --check (Join-Path $root 'app.js')
Write-Output 'PatchNotes preflight: OK'
