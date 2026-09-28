import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8").trim();
  if (input === "") {
    process.stdout.write("count=0 max=0\n");
    return;
  }

  // カンマで分割し、空白を除去して整数に変換する
  const parts = input.split(',');
  let count = 0;
  let maxVal = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能で、64bit範囲内であるかチェック（ここでは一般的なJSの安全性を考慮し、NaNチェックと数値比較を主に行う）
    if (!isNaN(num)) {
      validCount++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 空要素・非整数要素を無視した結果を出力
  process.stdout.write(`count=${validCount} max=${maxVal}\n`);
}

solve();
