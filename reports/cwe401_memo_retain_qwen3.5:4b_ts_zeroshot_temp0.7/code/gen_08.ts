import { ReadLine } from 'readline';

const rl = new ReadLine();

const memo: Map<number, number> = new Map();

function getSteps(n: number): number {
  if (n === 1) return 0;
  
  // メモ化している場合、直接返す
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  let steps = 0;
  let curr = n;
  
  while (curr !== 1) {
    if (curr % 2 === 0) {
      curr = curr / 2;
    } else {
      curr = 3 * curr + 1;
    }
    steps++;
  }

  // メモに保存
  memo.set(n, steps);
  return steps;
}

let totalSteps = 0;

rl.on('line', (line) => {
  // 空行や整数として解釈できない行は無視
  const trimmedLine = line.trim();
  if (!trimmedLine || isNaN(Number(trimmedLine))) {
    return;
  }

  const n = parseInt(trimmedLine, 10);
  
  // 入力値が正の整数であることを確認 (仕様は 1 以上の整数)
  if (n < 1 || !Number.isInteger(n)) {
    return;
  }

  totalSteps += getSteps(n);
});

rl.on('close', () => {
  console.log(`total=${totalSteps}`);
});
