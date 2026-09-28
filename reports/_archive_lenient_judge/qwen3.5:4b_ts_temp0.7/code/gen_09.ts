import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const num = parseInt(part.trim(), 10);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}

// Set を使って重複を除く（JavaScript の Object.keys や spread operator は ES6+）
if (numbers.length === 0) process.exit(0);

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
let sum: bigint | number = BigInt(0); // BigInt を使っても OK、ただし spec が「合計は 64bit 整数の範囲に収まる」とあるため数値計算で良いが、JS の Number は +/-2^53 より大きい値を正確に表せない可能性がある。
// spec: 「合計は 64bit 整数の範囲に収まります」 -> 出力時の型として number で OK が、計算途中では精度落ちするリスクあり。
// しかし「64bit 整数」という指定があるため、BigInt を使って安全に足し算し、最終的に数値またはそのまま BigInt を string に変換して出力すべきか？
// spec: `sum=<合計>` -> 通常は数字であることが多いが、仕様書で「64bit 整数の範囲」と言っている以上、大数の和を扱う必要がある。
// Node.js の number は IEEE754 double precision で約 +/-2^53 (9e15) が正確な表現限界だが、64bit signed integer は約 +/-9e18 までありうる。
// よって sum を BigInt で計算し、出力時は string に変換する方が安全。ただし spec の `count=<個数> sum=` というフォーマットは文字列として OK。

for (const num of uniqueNumbers) {
  // BigInt(0) から足すことで精度を保つ
  if (!BigInt.isBigInt(sum)) {
    const tempSum = Number(BigInt(Number(num)));
    sum += Number(tempSum); 
  } else {
     sum += BigInt(String(num));
  }
}

// より安全なアプローチ：全てを数値として処理し、最終的に文字列に変換する。
// ただし spec は「合計は 64bit 整数の範囲に収まります」と言っているので、計算結果がその範囲内である前提で出力すれば OK です。
// JavaScript の Number で足しても精度落ちしない限り問題ありませんが、厳密な大数対応なら BigInt を使うべきです。

let totalSum: string = '0';
for (const num of uniqueNumbers) {
  const nBigInt = BigInt(num);
  // sum が既に bigInt 型でない場合は初期化（上記のループ構造は少し複雑なので再構築）
}
// 再計算：シンプルに数値配列で足し算し、結果を文字列として扱う。

let currentSum: number | bigint = BigInt(0);
for (const num of uniqueNumbers) {
    const valBig = BigInt(num);
    // Number に変換して加えるのではなく直接累加する（BigInt 操作は正確）
    if (!Number.isInteger(Number(valBig))) continue; 
    currentSum += valBig;
}

// spec: `sum=<合計>` -> ここでは string を出力するのが最も安全で汎用的である。
console.log(`count=${uniqueNumbers.length} sum=${currentSum}`);
