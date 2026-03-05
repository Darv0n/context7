import * as readline from "node:readline";

export function createInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stderr, // use stderr so stdout stays clean for piping
  });
}

export async function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

export async function askMultiple(
  rl: readline.Interface,
  prompts: string[],
): Promise<Record<string, string>> {
  const answers: Record<string, string> = {};
  for (const prompt of prompts) {
    const answer = await ask(rl, `\n  ${prompt}\n  > `);
    answers[prompt] = answer;
  }
  return answers;
}

export function close(rl: readline.Interface): void {
  rl.close();
}
