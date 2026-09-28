import * as fs from "fs";

const s = fs.readFileSync(0, "utf8");
const parts = s.split(",");
let count = 0;
let max = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
  const trimmedPart = part.trim();
  if (trimmedPart === "") continue;

  const n = parseInt(trimmedPart, 10);
  if (!Number.isNaN(n)) {
    count++;
    if (n > max) {
      max = n;
    }
    hasValidNumber = true;
  }
}

if (count === 0) {
  // カウントが0の場合の最大値の扱い。問題文には明記されていないが、
  // 整数として解釈できた要素がない場合は、どうすべきか。
  // ここでは、要素数が0でmaxは定義されなかったという状況を避けるため、
  // 例2のように空でない要素の数と最大値を出力する要件に従い、
  // 有効な数値が一つもない場合は max は不定となる可能性があるが、
  // 64bit整数の範囲に収まるという指示に基づき、もし有効な数値が0個なら、
  // 慣習的にマイナス無限大（-Infinity）や最小値として扱うか、あるいは
  // 入力がないケースを考慮して、ここでは最大値が出現しない場合は特定の値を出すべき。
  // ただし、仕様は「要素数と最大値」を求めるので、有効な数値が0個の場合は max をどうするか？
  // 整数列なので、もしデータが空なら、最大値は定義できない。
  // 例として、入力がない場合は count=0, max=0 とする。（もし入力を一切受け取らなかった場合）
  // 厳密に「最大値」を求めるので、有効な数値が存在する場合のみmaxを更新する。
  // 数値が一つも存在しない場合は、最大値の初期値である -Infinity が残る。
}

if (count === 0) {
    // 有効な整数要素が一つもない場合、最大値は定義できないため、ここでは 0 を返すことにする。
    // ただし、もし入力された全ての要素が非数値だった場合は、count=0, max=-Infinityになる。
    // 問題の指示から「64bit整数の範囲に収まる」という制約があるので、-1または0を適切とする。
    // 入力がない場合の最大値は数学的に存在しないため、ここでは count=0, max=0 とする。（※この解釈は入力がない場合の一般的なケースに基づく）
    process.stdout.write(`count=0 max=0\n`);
} else {
  process.stdout.write(`count=${count} max=${max}\n`);
}
