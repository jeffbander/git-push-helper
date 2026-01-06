# Git Push Helper

A command-line tool to simplify git operations and push code to GitHub. This tool helps automate common git workflows with a clean, user-friendly interface.

## Features

- **Quick Push**: Stage, commit, and push with a single command
- **Status Check**: View detailed repository status with color-coded output
- **Repository Init**: Initialize git repos and configure GitHub remotes
- **Smart Error Handling**: Automatic upstream branch setup when needed
- **Beautiful Output**: Color-coded status and progress indicators
- **TypeScript**: Written in TypeScript for type safety

## Installation

```bash
npm install
npm run build
```

For global installation (optional):
```bash
npm link
```

## Usage

### Push Changes to GitHub

Stage all changes, commit, and push to GitHub:

```bash
npm start push -m "Your commit message"
```

Or if installed globally:
```bash
git-push push -m "Your commit message"
```

Without a message, it will use a timestamp:
```bash
git-push push
```

Specify a different directory:
```bash
git-push push -d /path/to/repo -m "Update files"
```

### Check Repository Status

View the current git status with detailed information:

```bash
git-push status
```

This shows:
- Current branch
- Remote repositories
- Commits ahead/behind remote
- Staged, modified, and untracked files

### Initialize a Repository

Initialize a new git repository:

```bash
git-push init
```

Initialize with a GitHub remote:
```bash
git-push init -r https://github.com/username/repo.git
```

## Command Reference

### `git-push push`

Stage all changes, commit, and push to GitHub.

**Options:**
- `-m, --message <message>` - Commit message (default: timestamp)
- `-d, --dir <directory>` - Directory to push (default: current directory)

### `git-push status`

Check the current git repository status.

**Options:**
- `-d, --dir <directory>` - Directory to check (default: current directory)

### `git-push init`

Initialize a git repository and optionally set up a remote.

**Options:**
- `-d, --dir <directory>` - Directory to initialize (default: current directory)
- `-r, --remote <url>` - GitHub remote URL

## Example Workflow

```bash
# Initialize a new repository
git-push init -r https://github.com/username/my-project.git

# Check status
git-push status

# Make some changes to your files...

# Push to GitHub
git-push push -m "feat: Add new feature"
```

## Tech Stack

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe development
- **Commander** - Command-line interface
- **simple-git** - Git operations
- **Chalk** - Terminal styling
- **Ora** - Elegant spinners

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

### Run Directly

```bash
npm run dev
```

## Requirements

- Node.js 18+
- Git installed and configured
- GitHub account (for pushing to remote)

## Error Handling

The tool includes comprehensive error handling:

- Checks if directory is a git repository
- Handles missing remotes gracefully
- Automatically sets upstream branches
- Provides clear error messages

## License

MIT
