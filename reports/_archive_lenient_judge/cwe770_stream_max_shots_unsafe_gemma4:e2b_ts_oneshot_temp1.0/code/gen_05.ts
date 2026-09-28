import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8").trim();
  if (!input) {
    process.stdout.write("count=0 max=0\n");
    return;
  }

  // カンマで分割し、各要素を数値に変換する
  const parts = input.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるか確認し、64bit範囲内か確認する（parseIntは標準で十分だが念のため）
    if (!isNaN(num) && String(num) === trimmedPart) { // 文字列全体が数字のみで構成されていることを確認
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      hasValidNumber = true;
    }
  }

  // 有効な要素が存在しない場合（空文字列や非数値のみの場合）、最大値を0とするか、仕様に依存するが、ここでは読み込んだ有効な数に基づいて処理する。
  if (!hasValidNumber) {
    // 入力が完全に無効であった場合、count=0, max=0とするのが妥当と判断する。
    process.stdout.write("count=0 max=0\n");
  } else {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
  }
}

solve();
