import * as process from "process";

function solve() {
  const input = process.stdin.readSync();
  if (!input) return;

  // カンマで分割して、各要素を数値に変換し、有効な数値を格納する
  const parts = input.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    // 空文字列や空白を除去した後に整数として解釈できるか確認（仕様上はカンマ区切りなので、空要素チェックと数値変換で十分）
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bit整数の範囲内にあるか（ここでは安全のためNumber型で扱うが、入力値の制約に従う）
    if (!isNaN(num)) {
      validCount++;
      const n = Number(num); // 数値として格納
      if (n > maxValue) {
        maxValue = n;
      }
    }
  }

  // 最終的な要素数と最大値を計算する。ただし、問題の意図として「入力されたカンマ区切りの整数列」の要素数をカウントするかどうかを明確にする必要がある。
  // 仕様：「カンマ区切りの整数列を受け取ります。」→ 入力された全ての有効な整数が列であると解釈し、その個数と最大値を求める。

  if (validCount > 0) {
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
  } else {
    // 有効な整数が一つもなかった場合（空入力または非数値のみの場合）
    process.stdout.write(`count=0 max=-Infinity\n`); // 最大値が定義できないため、-Infinityなどを設定する
  }
}

solve();
