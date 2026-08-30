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
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能か、かつ64bit範囲内かを確認（ここではNumber型で十分だが仕様に従う）
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
      validNumbersFound = true;
    }
  }

  // 整数として解釈できた要素のみを数える必要があるか、あるいは入力されたカンマ区切りの全要素数を数える必要があるか？
  // 仕様：「それらの『要素数』と『最大値』を求めます。」
  // 「空要素・前後の空白は無視し、整数として解釈できない要素も無視します。」

  // ここでは、入力文字列に含まれるカンマ区切りの非空白の数値要素の数を「要素数」とする。
  const actualCount = 0; // 上記ループでカウントしたものが要素数になるはずだが、ここでは再計算する。

  let finalCount = 0;
  for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") continue;
      const num = parseInt(trimmedPart, 10);
      if (!isNaN(num)) {
          finalCount++;
      }
  }


  // 最大値が設定されたかどうかに依存する。もし数値が一つもなかった場合、最大値はどうすべきか？
  // 例として、入力が空または数値が全く含まれていない場合は count=0, max=0 とする。
  const finalMaxValue = validNumbersFound ? maxValue : 0;

  process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
