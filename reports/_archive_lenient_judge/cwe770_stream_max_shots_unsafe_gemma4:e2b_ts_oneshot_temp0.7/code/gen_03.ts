import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8");
  
  // カンマで分割し、前後の空白を除去して整数に変換する
  const parts = input.split(',');
  
  let count = 0;
  let maxValue = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    // 空文字列や空白のみの要素をスキップ
    if (part.trim() === "") continue;
    
    const num = parseInt(part.trim(), 10);
    
    // 整数として解釈でき、かつ64bit範囲内であるかを確認（ここではparseIntの結果が有効な値とみなす）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      hasValidNumber = true;
    }
  }

  // 整数として解釈できた要素の数と最大値を計算する
  const finalCount = count;
  const finalMax = hasValidNumber ? maxValue : 0; // 有効な数値が一つもなければ最大値は0とする（問題文からは明確ではないが、安全策として）

  // 厳密に count=<個数> max=<最大値> の1行を出力する
  process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
}

solve();
