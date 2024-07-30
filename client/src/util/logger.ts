import chalk from 'chalk';

export function log(message: string | RegExpMatchArray | null, ...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(message, ...args);
  }
}

export function logError(message: string | RegExpMatchArray | null, ...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(chalk.bold.red(message), ...args);
  }
}
export function logWarn(message: string | RegExpMatchArray | null, ...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(chalk.bold.yellow(message), ...args);
  }
}
