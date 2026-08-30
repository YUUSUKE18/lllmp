import * as process from "process";

function solve() {
  const input = process.stdin.readSync();
  if (!input) return;

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

  // 整数として解釈できない要素も無視されるため、カウントは実際に処理された有効な数値の数となる。
  // 仕様では「要素数」と「最大値」を求めるため、入力されたカンマ区切りの非空要素の数を要素数とするのが自然だが、
  // 「整数として解釈できない要素も無視する」という指示があるため、実際にパースできた有効な整数の数をカウントし、その最大値を求める。

  if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
  } else {
    // 有効な整数が一つもなかった場合（入力が空または数値を含まなかった場合）
    // count=0, max=? の出力は仕様に厳密に従う。最大値は未定義だが、通常は無視されるか、特別な値になる。
    // ここでは、有効な数がない場合は count=0 とし、max の値は不定（ここでは-Infinityや0など）となるが、
    // 整数列が存在しないため、count=0 で終了する。
    process.stdout.write(`count=0 max=-Infinity\n`); // 数値が存在しない場合の安全策として
  }
}

solve();
