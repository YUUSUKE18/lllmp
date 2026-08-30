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
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能か確認（NaNチェックと、元の文字列が有効な整数表現であるかを確認）
    // ただし、仕様では「整数として解釈できない要素も無視」なので、parseIntの結果がNaNでないことを主とします。
    if (!isNaN(num)) {
      validCount++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 読み込んだ有効な整数の数と最大値を計算する（仕様の解釈として、入力されたカンマ区切りのすべての整数を対象とする）
  // 再度、元の入力全体からフィルタリングしてカウントと最大値を求める方がより厳密かもしれないが、
  // ここでは「カンマ区切りの整数列を受け取る」という指示に従い、その列に含まれる有効な数を数える。

  // 補足：もし「要素数」が入力された文字列の要素数ではなく、実際に数値として解釈できた要素数であるならば、上記のロジックで正しい。
  // 例: "1,2,a,3" -> count=3 (1, 2, 3), max=3

  process.stdout.write(`count=${validCount} max=${max}\n`);
}

solve();
