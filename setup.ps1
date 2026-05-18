# One-time setup script for the NiftyAi portfolio project.
#
# Run this once from PowerShell inside the project folder. It does what
# the Cowork sandbox couldn't do across the Windows filesystem mount:
#  1. Removes any partial node_modules / .git leftover from the sandbox
#  2. Installs dependencies fresh
#  3. Initializes git, makes the first commit
#  4. Creates the GitHub repo (using gh CLI if available) and pushes
#  5. Reminds you what to do next (enable Pages, add Formspree)
#
# Usage:
#   cd C:\Users\Igor\ProjectsPY\niftyai-portfolio
#   .\setup.ps1
#
# If you don't have GitHub CLI installed (gh), the script will stop after
# the local commit and print the manual `git remote add` command for you.

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==> NiftyAi portfolio setup" -ForegroundColor Cyan
Write-Host ""

# Step 1: clean up any sandbox leftovers. These can confuse npm and git.
Write-Host "[1/5] Cleaning sandbox leftovers..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "      removed node_modules"
}
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
    Write-Host "      removed .git"
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "      removed package-lock.json"
}

# Step 2: install dependencies. This is the slow one (~90s first time).
Write-Host ""
Write-Host "[2/5] Installing dependencies (npm install)..." -ForegroundColor Yellow
npm install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install failed. Fix the errors above and re-run setup.ps1." -ForegroundColor Red
    exit 1
}

# Step 3: initialize git and make the first commit. Splitting the commit
# into logical chunks would be nice but for a fresh scaffold one commit is fine.
Write-Host ""
Write-Host "[3/5] Initializing git repo..." -ForegroundColor Yellow
git init -b main | Out-Null
git add .
git commit -m "Initial commit: NiftyAi portfolio scaffold

Astro + Tailwind portfolio site with Hero, Services, Portfolio, About, and
Contact sections. Dark theme with electric accent, scroll-reveal animations,
GitHub Pages deploy workflow ready to go." | Out-Null
Write-Host "      committed initial scaffold"

# Step 4: create the GitHub repo and push, if gh CLI is available.
Write-Host ""
Write-Host "[4/5] Pushing to GitHub..." -ForegroundColor Yellow
$ghExists = Get-Command gh -ErrorAction SilentlyContinue
if ($ghExists) {
    # Public repo is fine for a portfolio. Switch to --private if you'd rather.
    gh repo create niftyai-portfolio --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "gh repo create failed. Maybe the repo already exists?" -ForegroundColor Yellow
        Write-Host "If so, run: git remote add origin https://github.com/IgorCSIS/niftyai-portfolio.git" -ForegroundColor Yellow
        Write-Host "Then:      git push -u origin main" -ForegroundColor Yellow
    } else {
        Write-Host "      pushed to https://github.com/IgorCSIS/niftyai-portfolio" -ForegroundColor Green
    }
} else {
    Write-Host "      gh CLI not found. Manual push steps:" -ForegroundColor Yellow
    Write-Host "      1. Create repo at https://github.com/new (name: niftyai-portfolio)" -ForegroundColor Yellow
    Write-Host "      2. git remote add origin https://github.com/IgorCSIS/niftyai-portfolio.git" -ForegroundColor Yellow
    Write-Host "      3. git push -u origin main" -ForegroundColor Yellow
}

# Step 5: print what's left to do. The Actions deploy needs Pages enabled
# in the repo settings; that's a one-time click we can't automate.
Write-Host ""
Write-Host "[5/5] Done. Next steps:" -ForegroundColor Green
Write-Host ""
Write-Host "  Enable GitHub Pages:" -ForegroundColor White
Write-Host "    https://github.com/IgorCSIS/niftyai-portfolio/settings/pages"
Write-Host "    Under Source, select GitHub Actions, save."
Write-Host ""
Write-Host "  Hook up the contact form:" -ForegroundColor White
Write-Host "    1. Sign up at https://formspree.io (free tier is fine)"
Write-Host "    2. Create a new form, copy the action URL"
Write-Host "    3. Copy .env.example to .env and paste the URL"
Write-Host "    4. Add the same URL as a repo secret named PUBLIC_FORMSPREE_ENDPOINT"
Write-Host "       so the deploy workflow can bake it into the production build"
Write-Host ""
Write-Host "  Start the dev server:" -ForegroundColor White
Write-Host "    npm run dev"
Write-Host "    Opens at http://localhost:4321"
Write-Host ""
Write-Host "Once Pages is enabled, every push to main auto-deploys to:" -ForegroundColor Cyan
Write-Host "  https://igorcsis.github.io/niftyai-portfolio" -ForegroundColor Cyan
Write-Host ""
