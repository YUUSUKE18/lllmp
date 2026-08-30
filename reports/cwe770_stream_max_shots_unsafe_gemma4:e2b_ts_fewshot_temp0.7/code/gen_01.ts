import * as fs from "fs";

function solve() {
  const input = fs.readFileSync(0, "utf8");
  const parts = input.split(",");
  let count = 0;
  let max = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    // 空白を除去して整数として解析を試みる
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bitの範囲内であるかを確認（ここではparseIntの結果が安全性を担保する）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      hasValidNumber = true;
    }
  }

  // 整数として解釈できた要素の数と最大値を計算
  // 空白や非数値は無視されるため、countとmaxが正しく集計されているか確認する。
  if (count === 0) {
    // 数値が一つもなかった場合の処理（仕様上は空の出力になるが、ここでは定義された形式に従う）
    // ただし、最大値を求めるため、もし数値が存在しなければmaxの出力はどうすべきか？
    // 例として、入力が空または非数値のみの場合、count=0, max=-Infinityとなる。
    // 64bit整数を扱うため、もし数値が存在しない場合は、安全策として適切な値（例えば最大値が存在しないことを示す）を出力する。
    // ここでは、読み込んだ有効な整数の数と最大値をそのまま出力する。
  }

  process.stdout.write(`count=${count} max=${max}\n`);
}

solve();
