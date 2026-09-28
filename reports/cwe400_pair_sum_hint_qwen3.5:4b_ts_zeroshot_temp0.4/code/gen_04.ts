import { ReadLine } from 'readline';

const rl = new ReadLine({ input: process.stdin });

rl.on('line', (line) => {
  if (!line.trim()) return;

  const target = parseInt(line.trim(), 10);
  if (isNaN(target)) return;

  const numbers = [];
  let hasInput = false;

  while (true) {
    rl.setEncoding('utf8');
    rl.on('data', (chunk: Buffer) => {
      const text = chunk.toString();
      if (!text.trim()) continue;
      try {
        const num = parseInt(text.trim(), 10);
        if (!isNaN(num)) {
          numbers.push(num);
          hasInput = true;
        }
      } catch (e) {
        // 整数として解釈できない行は無視
      }
    });

    rl.on('end', () => {
      if (!hasInput) return;

      const count = new Map<number, number>();
      for (const num of numbers) {
        const complement = target - num;
        if (count.has(complement)) {
          count.set(num, count.get(complement)! + 1);
        } else {
          count.set(num, 1);
        }
      }

      let pairs = 0;
      for (const [num, freq] of count.entries()) {
        if (freq > 1) {
          pairs += freq * (freq - 1) / 2;
        } else {
          const complement = target - num;
          if (count.has(complement)) {
            pairs++;
          }
        }
      }

      console.log(`pairs=${pairs}`);
    });
  }
});
