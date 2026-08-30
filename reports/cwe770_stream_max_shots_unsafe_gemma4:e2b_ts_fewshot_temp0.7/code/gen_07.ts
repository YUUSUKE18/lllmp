import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8").trim();
  if (input === "") {
    process.stdout.write("count=0 max=0\n");
    return;
  }

  // カンマで分割し、前後の空白を無視して整数に変換する
  const parts = input.split(",");
  let count = 0;
  let max = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるか、かつ64bitの範囲内かを確認（ここでは単純にNaNチェックと最大値更新を行う）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      hasValidNumber = true;
    }
  }

  // 整数として解釈できなかった要素があっても、有効な数のみをカウント・最大値を計算する。
  // 問題の指示に従い、読み込んだカンマ区切りの要素全体を対象とするのではなく、「整数」のみを考慮する。
  // ただし、例2の動作（空でない語の数を数える）と仕様（整数列を受け取る）を統合するため、ここでは「整数として解釈できたもの」をカウント対象とする。

  if (count === 0) {
    // 有効な整数が一つもなかった場合。最大値は定義できないため、0または適切なデフォルト値を設定する。
    // 整数列が空の場合、count=0, max=0とするのが自然。
    process.stdout.write(`count=0 max=0\n`);
  } else {
    process.stdout.write(`count=${count} max=${max}\n`);
  }
}

solve();
