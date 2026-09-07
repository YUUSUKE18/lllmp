import { stdin, stdout } from 'process';

const target = parseInt(stdin.read()!, 10);
const pairs = 0;

stdin.on('data', (c: Buffer) => {
  const s = Buffer.concat(data).toString('utf8');
  const lines = s.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (Number.isNaN(num)) continue;
    if (num === target) continue;
    if (num + lines[i - 1] === target) {
      pairs++;
    }
  }
  stdout.write(`pairs=${pairs}\n`);
});
