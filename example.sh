#!/bin/bash

# Example usage of git-push-helper

echo "=== Git Push Helper Examples ==="
echo ""

# Example 1: Check status
echo "1. Checking repository status:"
node dist/index.js status
echo ""

# Example 2: Initialize a repository (demonstration)
echo "2. Initialize a new repository (demo):"
echo "   node dist/index.js init -r https://github.com/username/repo.git"
echo ""

# Example 3: Push changes (demonstration)
echo "3. Push changes to GitHub (demo):"
echo "   node dist/index.js push -m 'feat: Add new feature'"
echo ""

echo "=== Run 'node dist/index.js --help' for more information ==="
