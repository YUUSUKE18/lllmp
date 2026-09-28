import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let targetValue: number | null = null;
let numbers: number[] = [];

rl.on('line', (line) => {
  if (targetValue === null) {
    const trimmed = line.trim();
    if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
      targetValue = Number(trimmed);
    } else {
      return; // 目標値が得られなかった場合、処理をスキップ
    }
  } else {
    const trimmed = line.trim();
    if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
      numbers.push(Number(trimmed));
    }
    // 空行や整数として解釈できない行は無視
  }

  rl.on('close', () => {
    let count = 0;
    const n = numbers.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (numbers[i] + numbers[j] === targetValue) {
          count++;
        }
      }
    }
    console.log(`pairs=${count}`);
  });
});
