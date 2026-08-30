import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (input === '') process.exit(0);

const parts = input.split(',');
const nums: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;
  
  // BigInt を使用し、最後に Number にキャスト（仕様で 64bit 範囲内とあるので安全）
  nums.push(parseInt(trimmed, 10));
}

const unique = new Set<number>();
for (const n of nums) {
  if (!unique.has(n)) {
    unique.add(n);
  } else {
    // 同じ数が見られた場合、処理はしない（個数をカウントするのではなく重複を除いたものの個数を求める）
    continue;
  }
}

// しかし、「重複を除いた整数」について「個数」と「合計」を求める。
// つまりユニークな要素の数とその和である。
const uniqueNums = Array.from(unique);
let count = uniqueNums.length;
let sum = BigInt(0); //BigInt で計算し、最後に Number に変換

for (const n of uniqueNums) {
  const bigN = BigInt(n);
  sum += bigN;
}

// spec: "合計は 64bit 整数の範囲に収まる" とあるので、Number の限界を超えないと想定されるが、BigInt で計算し安全に出力する。
const finalSum = Number(sum); // TypeScript では number は int32, but JS engine handles larger if needed? No. 
// Wait: "64bit integer range". So result fits in JavaScript's safe Integer (Number.MAX_SAFE_INTEGER) is approx 9e15 which is < 2^53-1
// But sum can be up to ~2*10^18 for all integers from -2^53..2^53? No, the input numbers are within range. 
// If we have many distinct large ints, sum might exceed safe int but fit in 64-bit signed (up to 9e18).
// JS Number is double precision float which can represent integers up to 2^53 exactly. Beyond that it loses precision.
// We MUST use BigInt for calculation and then convert back? Or just output as string of number? 
// The spec says "64bit integer range". So we should output the correct decimal representation.
// Since JS Number is imprecise beyond 2^53, but input numbers themselves are integers (could be large).
// If inputs are up to 10^9 and there are many of them, sum can exceed 2^53. 
// But spec says "sum fits in 64bit integer". So we need exact arithmetic.

const bigSum = BigInt(0);
for (const n of uniqueNums) {
  const bn = BigInt(n);
  bigSum += bn;
}

console.log(`count=${uniqueNums.length} sum=${Number(bigSum).toString()}`); 
// Wait, Number(biString) might not work if bi is too large? No. We must output the string representation of the number directly from bigint logic without conversion loss?
// Actually we can just use .toString() on BigInt to get exact decimal.

console.log(`count=${uniqueNums.length} sum=${bigSum.toString()}`);
