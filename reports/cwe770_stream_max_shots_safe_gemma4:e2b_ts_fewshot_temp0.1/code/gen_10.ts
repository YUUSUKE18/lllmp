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

    // 整数として解釈できるかチェックし、64bit範囲内かチェックする（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 整数として解釈できなかった要素は無視されるため、countとmaxValueが意味のある値を持つか確認する。
// 空の入力や数値が存在しない場合は、適切なデフォルト値を設定する必要があるが、ここでは読み込んだ有効な数のみをカウントする。
if (count === 0) {
    // 数値が一つもなかった場合、最大値は定義できない（または問題の文脈に応じて-Infinityなど）。
    // ここでは、入力された数値が存在しない場合は count=0, max=-1 などとして扱うのが一般的だが、
    // 仕様に従い「要素数」と「最大値」を出力する。
    // 整数列が空の場合、count=0, maxの扱いは文脈依存。ここでは読み込んだ有効な数の情報のみを反映させる。
    // もし入力が完全に無効な場合、count=0, max=-Infinityとするのが安全かもしれないが、
    // 例に従い、実際に処理した要素数と最大値を出す。
}

process.stdout.write(`count=${count} max=${maxValue}\n`);
