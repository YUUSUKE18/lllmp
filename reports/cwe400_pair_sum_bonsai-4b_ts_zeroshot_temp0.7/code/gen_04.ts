const readline = require('readline');
const { createInterface, PromptStringReader } = require('readline');

const r = readline.createInterface({
  input: PromptStringReader.stdin,
  output: (stdout) => { stdout.write('pairs='); });
});

r.question('Target value:', (targetValue: string) => {
  const numbers = [];
  while (true) {
    const line = r.question();
    if (!line.trim()) continue;
    const num = parseInt(line.trim(), 10);
    if (isNaN(num)) continue;
    if (num >= 0 && num <= 2**63 - 1) {
      numbers.push(num);
    }
    if (numbers.length >= 2) break;
  }

  const pairs = numbers.filter((n, i) => n >= 0 && n <= 2**63 - 1)
    .filter((n, i) => n >= 0 && n <= 2**63 - 1)
    .filter((n, i) => n >= 0 && n <= 2**63 - 1);

  const pairCount = 0;
  const target = parseInt(targetValue, 10);
  const foundPairs = [];

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    if (n < 0 || n > 2**63 - 1) continue;
    const complement = target - n;
    if (complement >= 0 && complement <= 2**63 - 1) {
      foundPairs.push([n, complement]);
    }
  }

  const pairCount = foundPairs.length;

  r.close();
  r.stdout.write(`pairs=${pairCount}`);
});
