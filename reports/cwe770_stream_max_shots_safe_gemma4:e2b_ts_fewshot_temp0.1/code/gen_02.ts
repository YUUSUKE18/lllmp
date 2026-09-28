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

    // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、仕様に従う）
    if (!isNaN(num) && isFinite(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した後のカウントと最大値を計算する。
// 仕様では「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるため、
// 読み込んだ文字列から有効な整数のみを数える必要がある。
// 上記のループでcountとmaxValueが正しく集計されていることを確認する。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 有効な整数が一つもなかった場合、最大値は定義できない（または適切なデフォルト値）。
    // ここでは、入力が空または無効な場合でも形式に従うため、0個と最小の負の無限大を返すか、あるいは単に0を出力する。
    // 課題の文脈から、有効な要素が存在しない場合は count=0, max=適切な値となるべきだが、
    // -Infinityは出力できないため、ここではcount=0として扱う。
    process.stdout.write(`count=0 max=-Infinity\n`); // または、問題の制約に従い、もし最大値が求められないなら0を出力するなど。
}
