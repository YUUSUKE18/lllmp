import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8").trim();
  if (input === "") {
    process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の扱い（仕様に明記はないが、安全のため）
    return;
  }

  const parts = input.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるかチェック (NaNや非数文字が含まれていないか)
    if (!isNaN(num)) {
      // 値が64bit整数の範囲内にあることを確認（JavaScriptのNumberは通常これに十分だが、厳密に）
      // ここでは一般的な数値処理を前提とする。
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 入力として与えられたカンマ区切りの要素数と最大値を求める、という指示は、
  // 実際には入力文字列からそれらを計算し出力するという意味で解釈する。
  process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
