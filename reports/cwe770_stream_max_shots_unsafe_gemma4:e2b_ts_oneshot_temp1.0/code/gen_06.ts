import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8").trim();
  if (!input) {
    process.stdout.write("count=0 max=0\n");
    return;
  }

  // カンマで分割し、各要素を数値に変換
  const parts = input.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let foundNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    
    // 整数として解釈できるか確認（パースエラーがないか、そして数値が妥当か）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      foundNumber = true;
    }
  }

  // 数値が見つからなかった場合、最大値は0（または適切なデフォルト値）とする。
  // ただし、仕様上、もし入力が空文字列や非数値のみだった場合は count=0, max=0となるべきだが、
  // 読み込んだ要素数と最大値を求めるため、実質的な整数値が存在したときのみカウントする。
  if (!foundNumber) {
      // すべての入力が無効だった場合、count=0, max=0とする
      process.stdout.write(`count=0 max=0\n`);
      return;
  }

  process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
