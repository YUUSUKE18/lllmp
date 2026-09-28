import * as fs from "fs";

const s = fs.readFileSync(0, "utf8");
const parts = s.split(",");
let count = 0;
let max = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
  // 空白をトリムしてチェック
  const trimmedPart = part.trim();
  if (trimmedPart === "") continue;

  const n = parseInt(trimmedPart, 10);

  // 整数として解釈できるか、かつ64bit範囲内かを確認（ここではparseIntの限界と一般的な数値範囲で十分とする）
  if (!Number.isNaN(n)) {
    count++;
    if (n > max) {
      max = n;
    }
    hasValidNumber = true;
  }
}

// 整数として解釈できた要素の数と最大値を計算する。
// ただし、仕様の「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」を厳密に適用するため、
// ここでは全ての有効な整数のみをカウント対象とする。

// 再度、個数と最大値を正確に計算するために、再走査する（または最初のループで集計する方法を工夫する）
// 最初のループでのロジックを修正し、countとmaxを同時に求める。

let finalCount = 0;
let finalMax = -Infinity;

for (const part of parts) {
  const trimmedPart = part.trim();
  if (trimmedPart === "") continue;

  const n = parseInt(trimmedPart, 10);

  if (!Number.isNaN(n)) {
    finalCount++;
    if (n > finalMax) {
      finalMax = n;
    }
  }
}


process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
