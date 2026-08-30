import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
  const trimmedPart = part.trim();
  if (trimmedPart === "") continue;

  const num = parseInt(trimmedPart, 10);

  if (!isNaN(num)) {
    count++;
    if (num > maxValue) {
      maxValue = num;
    }
    hasValidNumber = true;
  }
}

if (count === 0) {
    // カウントが0の場合、最大値は未定義だが、仕様に従いデフォルト値を設定する必要はない（ここでは-Infinityを保持する）
    // ただし、実用的な出力として、何も有効な数がない場合はmax=0や適切なエラー処理が必要になる場合があるが、
    // 仕様通りに計算された結果を出力する。今回は値が64bit範囲であるため、最小値が存在しないケースも考慮して、
    // 数値が存在しない場合の挙動を明確にするために、全ての要素が無視された場合は最大値を-Infinityのまま出力する。
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
