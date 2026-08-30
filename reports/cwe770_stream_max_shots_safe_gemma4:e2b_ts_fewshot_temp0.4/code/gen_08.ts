import * as fs from "fs";

const input = fs.readFileSync(0, "utf8");

const parts = input.trim().split(',');

let count = 0;
let maxVal = -Infinity;
let hasValidNumber = false;

for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈でき、かつ64bit範囲内かを確認（ここでは単純に数値として扱う）
    if (!isNaN(num)) {
        count++;
        if (num > maxVal) {
            maxVal = num;
        }
        hasValidNumber = true;
    }
}

// 空要素や非整数を無視した後のカウントと最大値を計算する。
// 仕様に基づき、読み込んだカンマ区切りの要素のうち、有効な整数のみを数える必要があるため、
// 最初の例の処理方法（空要素・空白無視）を考慮しつつ、ここでは「カンマで区切られた値」を対象とする。

// 再度、より厳密に「カンマ区切りの整数列」として解釈する。
const numbers = [];
for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart !== "") {
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
}

if (numbers.length === 0) {
    // 数値が一つもなかった場合、count=0, maxは定義できない（ここでは-Infinityまたは0などだが、最大値を求めるため、データがない場合は0とするのが安全かもしれない。ただし、入力が空の場合は0個と-Infinityを返すのが自然）
    process.stdout.write(`count=0 max=-Infinity\n`);
} else {
    const finalCount = numbers.length;
    const finalMax = Math.max(...numbers);
    process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
}
