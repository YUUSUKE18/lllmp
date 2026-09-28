import * as process from "process";

function solve() {
  const input = process.stdin.readSync();
  if (!input) return;

  const parts = input.split(",");
  let count = 0;
  let maxValue = -Infinity;
  let foundNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // チェック: 数値として解釈でき、かつ64bit整数に収まるかを確認する（ここでは安全のためNaNチェックを優先）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      foundNumber = true;
    }
  }

  // 要素数と最大値を計算して出力
  process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
