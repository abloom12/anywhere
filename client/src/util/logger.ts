import chalk from 'chalk';

// export function log(message: string, ...args: any[]) {
//   if (import.meta.env.DEV) {
//     console.log(chalk.blue(`${message}`), ...args);
//   }
// }

export function log(message: string | RegExpMatchArray | null, ...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(message, ...args);
  }
}
