import chalk from "chalk";

export default function log(message: string, ...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(chalk.blue(`${message}`), ...args);
  }
}
