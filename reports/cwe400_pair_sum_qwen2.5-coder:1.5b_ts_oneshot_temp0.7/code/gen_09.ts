import { readFileSync } from 'fs';

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const input = readFileSync('input.txt', 'utf8');
  const lines = input.trim().split(/\r?\n/);
  const target = parseInt(lines[0], 10);
  let count = 0;

  for (let i = 1; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const sum = parseInt(lines[i], 10) + parseInt(lines[j], 10);
      if (sum === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
