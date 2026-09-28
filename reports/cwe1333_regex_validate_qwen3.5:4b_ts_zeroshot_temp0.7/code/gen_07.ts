import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let validCount = 0;

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (trimmed === '') return;

  const parts = trimmed.split(',').map((p) => Number(p));

  if (parts.length > 0 && !isNaN(parts[0])) {
    for (const p of parts) {
      if (Number.isNaN(p)) return;
    }
  } else {
    return;
  }

  validCount++;
});

rl.on('close', () => {
  process.stdout.write(`valid=${validCount}\n`);
});
