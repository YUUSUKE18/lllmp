import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");
const tokens = input.trim().split(',');

let count = 0;
let maxValue = -Infinity;
let hasValidNumber = false;

for (const token of tokens) {
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    const num = parseInt(trimmedToken, 10);

    // チェック: 数値として解釈でき、64bit整数範囲内であること
    if (!isNaN(num) && num >= -2**63 && num <= 2**63 - 1) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非数値要素を無視した上で、有効な数の個数と最大値を計算する。
// 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
// カンマ区切りのトークンをそのまま処理し、数値として有効なものだけをカウントする。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合、count=0, max=? となるが、最大値の定義に合わせるため、
    // 少なくとも1行は出力する。ここでは最大値を-Infinityとして扱うか、あるいは入力がない場合は0を出力する。
    // 例2や例3の挙動を考慮すると、有効な要素が0個なら max の値は問題ない（ただし、初期化された -Infinity をそのまま出力）。
    // 課題の意図から、少なくとも count=0, max=-Infinity または count=0, max=適切なデフォルト値を期待する。
    // ここでは、入力に有効な数値が一つもなかった場合は count=0, max=0 と仮定するのが自然かもしれないが、
    // 最大値の初期値(-Infinity)をそのまま出力する。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
