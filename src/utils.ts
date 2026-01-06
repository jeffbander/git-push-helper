import chalk from 'chalk';
import { StatusResult, FileStatusResult } from 'simple-git';

export function formatStatus(status: StatusResult): string {
  const parts: string[] = ['\n'];

  if (status.ahead > 0) {
    parts.push(chalk.yellow(`↑ ${status.ahead} commit(s) ahead of remote`));
  }

  if (status.behind > 0) {
    parts.push(chalk.yellow(`↓ ${status.behind} commit(s) behind remote`));
  }

  if (status.ahead === 0 && status.behind === 0 && status.files.length === 0) {
    parts.push(chalk.green('✓ Working tree clean'));
  }

  if (status.files.length > 0) {
    const staged = status.files.filter(f => f.index !== ' ' && f.index !== '?');
    const unstaged = status.files.filter(f => f.working_dir !== ' ' && f.working_dir !== '?');
    const untracked = status.files.filter(f => f.index === '?' || f.working_dir === '?');

    if (staged.length > 0) {
      parts.push(chalk.green(`✓ ${staged.length} file(s) staged`));
    }

    if (unstaged.length > 0) {
      parts.push(chalk.yellow(`⚠ ${unstaged.length} file(s) modified`));
    }

    if (untracked.length > 0) {
      parts.push(chalk.red(`✗ ${untracked.length} file(s) untracked`));
    }
  }

  return parts.join('\n');
}

export function formatChanges(files: FileStatusResult[]): string {
  const output: string[] = [];

  files.forEach(file => {
    const status = getStatusSymbol(file);
    const color = getStatusColor(file);
    output.push(color(`  ${status} ${file.path}`));
  });

  return output.join('\n');
}

function getStatusSymbol(file: FileStatusResult): string {
  if (file.index === '?' || file.working_dir === '?') {
    return '??';
  }
  if (file.index === 'A') {
    return 'A ';
  }
  if (file.index === 'M' || file.working_dir === 'M') {
    return 'M ';
  }
  if (file.index === 'D' || file.working_dir === 'D') {
    return 'D ';
  }
  if (file.index === 'R') {
    return 'R ';
  }
  return '  ';
}

function getStatusColor(file: FileStatusResult): typeof chalk {
  if (file.index === '?' || file.working_dir === '?') {
    return chalk.red;
  }
  if (file.index === 'A') {
    return chalk.green;
  }
  if (file.index === 'M' || file.working_dir === 'M') {
    return chalk.yellow;
  }
  if (file.index === 'D' || file.working_dir === 'D') {
    return chalk.red;
  }
  return chalk.gray;
}
