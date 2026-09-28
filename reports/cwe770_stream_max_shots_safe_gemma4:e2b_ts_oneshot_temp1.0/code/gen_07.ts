import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const data = input.trim();
    if (data === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // または適切なデフォルト値。ここでは最大値を負の無限大とする。
        return;
    }

    // カンマで分割し、空文字列を除去
    const parts = data.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let validNumbers = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェック (NaNやInfinityなど、数値以外のものも除外したいが、ここでは文字列として判定し、パースで確認する)
        // parseIntやNumber()を使って、本当に整数であるかを確認する。
        const num = Number(trimmedPart);
        if (!isNaN(num) && isFinite(num)) {
            validNumbers.push(num);
        }
    }

    count = validNumbers.length;

    if (count === 0) {
        // 要素が一つも有効でなかった場合、最大値は定義できない。仕様に従い-Infinityとする。
        process.stdout.write(`count=0 max=-Infinity\n`);
        return;
    }

    // 最大値を求める
    let currentMax = validNumbers[0];
    for (let i = 1; i < count; i++) {
        if (validNumbers[i] > currentMax) {
            currentMax = validNumbers[i];
        }
    }

    process.stdout.write(`count=${count} max=${currentMax}\n`);
}

solve();
