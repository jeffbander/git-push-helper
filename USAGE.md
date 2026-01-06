# Git Push Helper - Quick Start Guide

## Installation

```bash
# Clone the repository
git clone https://github.com/jeffbander/git-push-helper.git
cd git-push-helper

# Install dependencies
npm install

# Build the project
npm run build
```

## Quick Examples

### 1. Check Repository Status

```bash
node dist/index.js status
```

Output:
```
📊 Git Status

Branch: master

Remotes:
  origin: https://github.com/username/repo.git

✓ Working tree clean
```

### 2. Push Changes to GitHub

```bash
node dist/index.js push -m "Add new feature"
```

This will:
1. Stage all changes (`git add .`)
2. Commit with your message
3. Push to GitHub

### 3. Work with Different Directories

```bash
# Check status of another repository
node dist/index.js status -d /path/to/repo

# Push changes from another directory
node dist/index.js push -d /path/to/repo -m "Update files"
```

### 4. Initialize a New Repository

```bash
# Initialize without remote
node dist/index.js init

# Initialize with GitHub remote
node dist/index.js init -r https://github.com/username/new-repo.git
```

## Global Installation (Optional)

To use the tool from anywhere:

```bash
npm link
```

Then you can use:

```bash
git-push status
git-push push -m "Your commit message"
```

## Example Workflow

```bash
# 1. Make some changes to your code
# ... edit files ...

# 2. Check what changed
node dist/index.js status

# 3. Push to GitHub
node dist/index.js push -m "feat: Add login functionality"

# Done! Your changes are on GitHub
```

## Tips

- **Commit Messages**: Always use descriptive commit messages
- **Multiple Repos**: Use `-d` flag to work with multiple repositories
- **Automation**: Add this tool to your scripts for automated pushing

## Common Use Cases

### Daily Development

```bash
# At the end of your workday
node dist/index.js push -m "End of day: $(date +%Y-%m-%d)"
```

### Quick Updates

```bash
# For small fixes
node dist/index.js push -m "fix: typo in README"
```

### Multiple Projects

```bash
# Update multiple projects
node dist/index.js push -d ~/project1 -m "Update dependencies"
node dist/index.js push -d ~/project2 -m "Update dependencies"
```

## Troubleshooting

### "Not a git repository"
Run: `node dist/index.js init`

### "No remote configured"
Run: `node dist/index.js init -r https://github.com/username/repo.git`

### Push fails
- Check your GitHub credentials
- Verify you have push access to the repository
- Ensure the remote URL is correct

## Support

For more information, see the [README.md](README.md) or visit:
https://github.com/jeffbander/git-push-helper
