import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値の初期値に依存）
        return;
    }

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let foundNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            foundNumber = true;
        }
    }

    // 数値が見つからなかった場合は、最大値を適切に扱う必要があるが、
    // 仕様上は整数列として解釈できるもののみを対象とするため、入力された有効な数の情報に基づいて出力する。
    if (count === 0) {
        // カンマ区切りの要素がすべて無効だった場合（例: "a,b"）、数と最大値を出力する。
        // 数が見つからなかった場合は、問題の文脈に基づき、ここでは0個で最小値（または特別な値）とするのが自然だが、
        // 64bit整数として扱われるため、-Infinityは避けるべきかもしれない。
        // ただし、入力が空文字列の場合（" "など）、count=0となる。ここでは全ての数値が見つからなかったと扱う。
         process.stdout.write(`count=0 max=-2147483648\n`); // 64bit整数の最小値に近い値を出力するなど、定義に従う必要があるが、ここでは入力に基づき0としておくのが安全。
    } else {
        // 標準出力へ厳密に指定された形式で出力
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
