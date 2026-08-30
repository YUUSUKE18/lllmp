import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let maxVal: number | undefined;

for (const part of parts) {
  const trimmed = part.trim();
  if (trimmed === '') continue;
  
  // 整数として解釈できるかチェック（正負の符号を含む）
  let val: bigint;
  try {
    val = BigInt(trimmed);
  } catch (_) {
    continue;
  }

  const numVal = Number(val);
  if (maxVal === undefined || numVal > maxVal) {
    maxVal = numVal;
  }
}

const count = parts.filter(p => p.trim() !== '').length; // 空要素・空白無視した元の個数？仕様は「整数として解釈できない要素も無視します」とあるが、カウントの基準が不明。通常は有効なデータの数だが、「要素数」を求めるとあるので、入力された文字列分割後の非空数をカウントするのが安全か。しかし、「整数として解釈できない要素も無視します」という処理が行われている以上、実際に値を持つ個数が「count」であるべきだろう。
// 再考: 「それらの『要素数』と『最大値』を求めます。」という文脈から、有効に解析できた数の数を count とするのが自然。
const validCount = parts.filter(p => {
    const trimmed = p.trim();
    if (trimmed === '') return false;
    try { BigInt(trimmed) } catch(e){return false;} // 整数として解釈可能か
}).length;

console.log(`count=${validCount} max=${maxVal}`);
