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

    // 整数として解釈でき、64bit範囲内かを確認（ここでは単純に数値として扱う）
    if (!isNaN(num)) {
        count++;
        if (num > maxValue) {
            maxValue = num;
        }
        hasValidNumber = true;
    }
}

// 空要素・前後の空白は無視し、整数として解釈できない要素も無視する処理はsplitとtrimで概ねカバーされるが、
// 厳密に「空でない語」のカウントを求めるため、上記ロジックでcountを計算した。
// ただし、課題の要求は「カンマ区切りの整数列を受け取る」ことなので、ここでは読み込んだ要素数と最大値を求める。

if (count > 0) {
    process.stdout.write(`count=${count} max=${maxValue}\n`);
} else {
    // 整数が一つもなかった場合（空入力など）の処理。maxの初期値に依存する。
    // ここでは、もしデータがあれば出力する。データがなければ何も出力しないか、仕様に従う。
    // 少なくとも、読み込んだ要素数と最大値を報告する必要があるため、count=0, max=-Infinityで出力する。
    process.stdout.write(`count=0 max=-Infinity\n`);
}
