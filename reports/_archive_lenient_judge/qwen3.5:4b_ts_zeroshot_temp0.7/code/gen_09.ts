import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

let values: number[] = [];
try {
  const parts = input.split(',');
  for (const part of parts) {
    if (/^-?\d+$/.test(part)) {
      values.push(parseInt(part, 10));
    } else {
      // 整数として解釈できない要素は無視
      continue;
    }
  }
} catch {}

// 重複を除くセットを作成し、サイズを取得（count）
const uniqueSet = new Set<number>(values);
const count: number = uniqueSet.size;

let sum: bigint = BigInt(0);
for (const val of values) {
  // JavaScript の Number を直接足すとオーバーフローのリスクがあるため、BigInt で処理する。
  // ただし spec は「64bit integer」と言っているが、Node.js では SafeInt32 などありうるが、
  // BigInt が確実に安全です。数値をそのまま取れば OK です。
  sum += BigInt(val);
}

console.log(`count=${count} sum=${sum}`);
