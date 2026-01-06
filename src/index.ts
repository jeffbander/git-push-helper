#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { pushToGitHub, checkStatus, initializeRepo } from './commands.js';

const program = new Command();

program
  .name('git-push')
  .description('A CLI tool to help manage git operations and push code to GitHub')
  .version('1.0.0');

program
  .command('push')
  .description('Stage all changes, commit, and push to GitHub')
  .option('-m, --message <message>', 'Commit message')
  .option('-d, --dir <directory>', 'Directory to push (defaults to current directory)', process.cwd())
  .action(async (options) => {
    try {
      await pushToGitHub(options.dir, options.message);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check the current git status')
  .option('-d, --dir <directory>', 'Directory to check (defaults to current directory)', process.cwd())
  .action(async (options) => {
    try {
      await checkStatus(options.dir);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new git repository and set up GitHub remote')
  .option('-d, --dir <directory>', 'Directory to initialize (defaults to current directory)', process.cwd())
  .option('-r, --remote <url>', 'GitHub remote URL')
  .action(async (options) => {
    try {
      await initializeRepo(options.dir, options.remote);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program.parse();
