import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8");
  
  // カンマで分割し、各要素をトリムして配列にする
  const parts = input.split(",");
  
  let count = 0;
  let maxValue = -Infinity;
  let foundNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではNumber型で十分）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      foundNumber = true;
    }
  }

  // 整数として解釈できた要素の数と最大値を計算する。
  // 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
  // カウントは有効な整数のみを数えるべきか、入力されたカンマ区切りの要素の総数を数えるべきか曖昧ですが、
  // 例2の動作（空でない語の数を数える）を踏まえ、ここでは「整数として解釈できた要素」の数をカウントし、
  // その中で最大値を求めるものとします。

  // 再度、仕様を厳密に解釈し、入力されたカンマ区切りの要素の総数ではなく、有効な整数要素の数をカウントする。
  // 例2が「空でない語の数」を求めているため、ここでは有効な整数要素の数をカウントします。

  let finalCount = 0;
  let finalMax = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      finalCount++;
      if (num > finalMax) {
        finalMax = num;
      }
    }
  }


  process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
}

solve();
