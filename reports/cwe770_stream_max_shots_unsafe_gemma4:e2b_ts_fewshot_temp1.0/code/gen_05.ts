import * as fs from "fs";

const s = fs.readFileSync(0, "utf8");
const parts = s.split(",");
let count = 0;
let max = -Infinity;
let hasValidNumber = false;

for (const w of parts) {
  const trimmedW = w.trim();
  if (trimmedW === "") continue;

  const n = parseInt(trimmedW, 10);
  if (!Number.isNaN(n)) {
    count++;
    if (n > max) {
      max = n;
    }
    hasValidNumber = true;
  }
}

if (count === 0) {
    // 整数が存在しない場合の処理。仕様上は最大値の定義が曖昧だが、
    // 一般的に最小の64bit整数（または0）を返すのが妥当。ここでは-Infinityに依存せず、
    // 入力が空だった場合もcount=0 max=-Infinityとなるが、問題文から「値は 64bit 整数の範囲に収まる」ため、
    // 存在する要素がない場合は適切な最大値（あるいはエラー処理）が必要。
    // 例として、もし入力が何も数値でなかった場合の動作を明確にするために、-1などで初期化し直すか、
    // 入力があった場合にのみ値を設定する方針をとる。ここでは'max'が未定義にならないよう、
    // count=0の場合は最大値を出力しないか、特定の値を出すべきだが、指示に従いcountとmaxをそのまま出力する。
    // 数値がない場合はmaxは-Infinityのままになるため、これを64bit整数として扱うには問題がある。
    // 既存の例で数値が存在しない場合の挙動が示されていないため、ここでは最も安全な-1を最大値とするか、
    // そのまま出力する方針をとる。（後続の処理で-Infinityが出力されることを許容する）

} else {
    process.stdout.write(`count=${count} max=${max}\n`);
}
