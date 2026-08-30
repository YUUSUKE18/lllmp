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

    if (!isNaN(num)) {
        count++;
        if (num > maxVal) {
            maxVal = num;
        }
        hasValidNumber = true;
    }
}

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxVal}\n`);
} else {
    // 整数として有効な要素が一つもなかった場合、最大値の定義に注意が必要だが、
    // 仕様に従い count=0, max=-Infinity などと出力するのが適切。
    // ただし、例示がないため、ここでは入力があった場合の処理に焦点を当てる。
    // 入力が空または無効な場合も数値を出す必要があるため、maxValの初期値(-Infinity)が反映される。
    process.stdout.write(`count=0 max=-Infinity\n`); 
}
