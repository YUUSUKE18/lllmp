import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let targetValue: bigint | null = null;
let numbers: bigint[] = [];

rl.on('line', (line) => {
  if (!targetValue) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      try {
        targetValue = BigInt(trimmed);
      } catch {
        // 目標値が整数でない場合は無視（仕様：空行や解釈できない行は無視）
      }
    }
  } else {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      try {
        const num = BigInt(trimmed);
        numbers.push(num);
      } catch {
        // 整数として解釈できない行は無視
      }
    }
  }

  rl.on('close', () => {
    if (!targetValue || numbers.length < 2) {
      console.log('pairs=0\n');
      return;
    }

    let count = 0n;
    for (let i = 0n; i < numbers.length - 1n; i++) {
      for (let j = i + 1n; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === targetValue) {
          count++;
        }
      }
    }

    console.log(`pairs=${count}\n`);
  });
});
