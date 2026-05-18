# Drops the original and intermediate image files we no longer need,
# leaving only the processed assets the site actually references.
#
# Why this exists: Cowork processed the brand assets (knocked out white
# backgrounds, cropped to wordmark) but the sandbox couldn't delete the
# originals from the Windows-mounted filesystem due to permission limits.
# This is the one-time cleanup to run on your machine.
#
# Safe to re-run: if the originals are already gone, the script just says
# so and exits clean.
#
# Usage:
#   .\scripts\cleanup-images.ps1

$ErrorActionPreference = "Stop"

$imagesDir = Join-Path $PSScriptRoot ".." "public" "images"
$imagesDir = (Resolve-Path $imagesDir).Path

Write-Host "Cleaning $imagesDir" -ForegroundColor Cyan

# Files to drop: the raw camera-style filenames and any intermediate
# cropped/tight variants. We keep:
#   hero-wordmark-01.png        (the hero centerpiece)
#   hero-wordmark-02.png        (alt, in case you want to swap)
#   hero-wordmark-03.png        (alt)
#   icon-button-01..05.png      (the 5 round button icons, kept for future use)
#   chrome-wordmark-01..03.png  (cleaned full-frame versions, kept as source)
$patternsToRemove = @(
    "20250514_*.png",                       # raw chrome originals from the prompt
    "ChatGPT Image *.png",                  # raw icon originals
    "chrome-wordmark-*-cropped.png",        # first-pass crop attempts
    "chrome-wordmark-*-tight.png"           # second-pass crop attempts
)

$removed = 0
foreach ($pattern in $patternsToRemove) {
    $matches = Get-ChildItem -Path $imagesDir -Filter $pattern -ErrorAction SilentlyContinue
    foreach ($file in $matches) {
        Remove-Item $file.FullName -Force
        Write-Host "  removed $($file.Name)" -ForegroundColor DarkGray
        $removed++
    }
}

if ($removed -eq 0) {
    Write-Host "Nothing to clean. Already tidy." -ForegroundColor Green
} else {
    Write-Host "Removed $removed file(s)." -ForegroundColor Green
}

Write-Host ""
Write-Host "Remaining files in public/images:" -ForegroundColor Cyan
Get-ChildItem $imagesDir | ForEach-Object {
    $sizeKb = [math]::Round($_.Length / 1KB, 1)
    Write-Host ("  {0,-40} {1,8} KB" -f $_.Name, $sizeKb)
}
