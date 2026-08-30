import * as process from "process";

function solve() {
  const input = process.stdin.readSync();
  if (!input) return;

  // カンマで分割し、各要素を整数に変換する
  const parts = input.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    // 空文字列や空白を除去した後に整数として解釈できるか確認
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として有効であり、64bitの範囲内であるかを確認（ここでは安全のため数値として扱えるかを確認）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      hasValidNumber = true;
    }
  }

  // 有効な要素が存在する場合のみ出力
  if (hasValidNumber) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
  } else {
    // 有効な整数が一つもなかった場合の処理（仕様に明記されていないが、安全のため）
    // ここでは、入力されたものからカウントと最大値は0として扱うか、または何も出力しないかの選択肢がある。
    // 課題の文脈上、読み取った要素数と最大値を報告する必要があるため、最低限の値を設定する。
    process.stdout.write(`count=0 max=-Infinity\n`); // または適切なデフォルト値
  }
}

solve();
