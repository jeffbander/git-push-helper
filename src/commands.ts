import simpleGit, { SimpleGit } from 'simple-git';
import chalk from 'chalk';
import ora from 'ora';
import { formatStatus, formatChanges } from './utils.js';

export async function pushToGitHub(directory: string, message?: string): Promise<void> {
  const git: SimpleGit = simpleGit(directory);

  // Check if git repository exists
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    throw new Error('Not a git repository. Run "git-push init" first.');
  }

  const spinner = ora('Checking repository status...').start();

  try {
    // Check status
    const status = await git.status();

    if (status.files.length === 0) {
      spinner.info('No changes to commit');
      return;
    }

    spinner.text = 'Staging changes...';

    // Stage all changes
    await git.add('.');

    // Get commit message
    const commitMessage = message || `Update: ${new Date().toLocaleString()}`;

    spinner.text = `Committing changes: "${commitMessage}"...`;

    // Commit
    await git.commit(commitMessage);

    spinner.text = 'Pushing to GitHub...';

    // Get current branch
    const branchSummary = await git.branch();
    const currentBranch = branchSummary.current;

    // Push to remote
    try {
      await git.push('origin', currentBranch);
      spinner.succeed(chalk.green(`Successfully pushed to GitHub (${currentBranch})`));

      console.log(chalk.cyan('\nCommit details:'));
      console.log(chalk.gray(`  Branch: ${currentBranch}`));
      console.log(chalk.gray(`  Message: ${commitMessage}`));
      console.log(chalk.gray(`  Files changed: ${status.files.length}`));
    } catch (pushError) {
      spinner.warn('Push failed - attempting to set upstream branch...');

      try {
        await git.push('origin', currentBranch, ['--set-upstream']);
        spinner.succeed(chalk.green(`Successfully pushed to GitHub (${currentBranch})`));
      } catch (upstreamError) {
        spinner.fail('Failed to push to remote');
        throw new Error('Unable to push to remote. Please check your remote configuration.');
      }
    }
  } catch (error) {
    spinner.fail('Operation failed');
    throw error;
  }
}

export async function checkStatus(directory: string): Promise<void> {
  const git: SimpleGit = simpleGit(directory);

  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    console.log(chalk.yellow('Not a git repository'));
    return;
  }

  const spinner = ora('Checking status...').start();

  try {
    const status = await git.status();
    const remotes = await git.getRemotes(true);
    const branch = await git.branch();

    spinner.stop();

    console.log(chalk.bold.cyan('\n📊 Git Status\n'));

    console.log(chalk.bold('Branch:'), chalk.green(branch.current));

    if (remotes.length > 0) {
      console.log(chalk.bold('\nRemotes:'));
      remotes.forEach(remote => {
        console.log(chalk.gray(`  ${remote.name}: ${remote.refs.push}`));
      });
    } else {
      console.log(chalk.yellow('\nNo remotes configured'));
    }

    console.log(formatStatus(status));

    if (status.files.length > 0) {
      console.log(chalk.bold('\nChanges:'));
      console.log(formatChanges(status.files));
    }
  } catch (error) {
    spinner.fail('Failed to check status');
    throw error;
  }
}

export async function initializeRepo(directory: string, remoteUrl?: string): Promise<void> {
  const git: SimpleGit = simpleGit(directory);

  const spinner = ora('Initializing git repository...').start();

  try {
    const isRepo = await git.checkIsRepo();

    if (!isRepo) {
      await git.init();
      spinner.text = 'Repository initialized';
    } else {
      spinner.info('Repository already initialized');
    }

    if (remoteUrl) {
      spinner.text = 'Adding remote...';

      try {
        await git.addRemote('origin', remoteUrl);
        spinner.succeed(chalk.green('Repository initialized with remote'));
        console.log(chalk.gray(`Remote URL: ${remoteUrl}`));
      } catch (error) {
        // Remote might already exist
        const remotes = await git.getRemotes(true);
        const origin = remotes.find(r => r.name === 'origin');

        if (origin) {
          spinner.info('Remote "origin" already exists');
          console.log(chalk.gray(`Current remote: ${origin.refs.push}`));
        } else {
          throw error;
        }
      }
    } else {
      spinner.succeed(chalk.green('Repository initialized'));
      console.log(chalk.yellow('Tip: Add a remote with --remote option'));
    }
  } catch (error) {
    spinner.fail('Failed to initialize repository');
    throw error;
  }
}
