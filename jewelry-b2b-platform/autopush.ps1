# auto-push.ps1
# Auto add, commit, and push changes to Git

# Navigate to your project folder
Set-Location "C:\Users\admin\Desktop\B2B Jewelry"

# Get current branch name
$branch = git rev-parse --abbrev-ref HEAD

# Stage all changes
git add .

# Check if there are any changes to commit
if (-not (git diff --cached --quiet)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-push at $timestamp"
    git push origin $branch
    Write-Host "Auto-pushed to $branch at $timestamp"
} else {
    Write-Host "No changes to commit."
}
