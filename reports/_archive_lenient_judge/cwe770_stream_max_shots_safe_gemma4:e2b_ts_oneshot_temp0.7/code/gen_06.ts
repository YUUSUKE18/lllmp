import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = "";

rl.on("line", (line) => {
  input = line;
});

rl.on("close", () => {
  if (!input) return;

  const parts = input.split(',').map(s => s.trim());

  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    if (part === "") continue;

    const num = parseInt(part, 10);

    // チェック：整数として解釈可能か、かつ64bit範囲内か
    if (!isNaN(num) && isFinite(num)) {
      // 64bit整数の範囲チェック（Node.jsのNumber型はIEEE 754倍精度で約16桁まで正確だが、ここでは安全のため）
      // 課題の制約から、標準的なJavaScriptの安全な整数範囲内で処理する。
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 要素数と最大値を計算し出力
  process.stdout.write(`count=${validCount} max=${maxValue}\n`);
});
