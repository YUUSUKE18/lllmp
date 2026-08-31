import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
  console.log(`count=0 sum=0`);
  process.exit(0);
}

// パーサー：`値:回数`の形式を確認し、有効な要素のみを抽出する。
// `:` の前後に空白がある場合も正規化し、整数として解析する。
const parts = input.split(',');
let count = 0;
let sum = 0n;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed.includes(':')) continue; // : が含まれない場合は無視
  
  const colonIndex = trimmed.indexOf(':');
  const strValue = trimmed.substring(0, colonIndex);
  const strCount = trimmed.substring(colonIndex + 1).trim();

  if (isNaN(parseInt(strValue, 10))) continue; // 値が整数でない場合は無視
  
  if (!/^-?\d+$/.test(strCount)) continue; // 回数が整数でない場合は無視
  const countVal = parseInt(strCount, 10);
  if (countVal < 0) continue; // 負の回数は無視（仕様：0 以上）

  const value = parseInt(strValue, 10);
  
  //BigInt の計算
  sum += BigInt(value) * BigInt(countVal);
  count += countVal;
}

console.log(`count=${count} sum=${sum}`);
