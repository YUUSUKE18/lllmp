import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let validCount = 0;

rl.on('line', (line) => {
  const trimmed = line.trim();
  
  // 空行は妥当ではない
  if (trimmed.length === 0) {
    return;
  }
  
  // 数字とカンマ以外が含まれているかチェック
  // 正規表現: ^[\d,]+$ が一致する必要がある
  if (!/^\d+$/.test(trimmed.split(',').join(''))) {
    return;
  }
  
  // カンマ区切りの整数列として妥当か判定
  const parts = trimmed.split(',');
  
  // 1 個以上の数字列があることを確認
  if (parts.length < 1) {
    return;
  }
  
  // 各要素が整数であることを確認
  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      return;
    }
  }
  
  validCount++;
});

rl.on('close', () => {
  process.stdout.write(`valid=${validCount}\n`);
});
