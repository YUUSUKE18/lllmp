import * as fs from "fs";
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = "";

rl.on("line", (line) => {
    input += line + "\n";
});

rl.on("close", () => {
    if (!input.trim()) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.trim().split(',');
    let count = 0;
    let max = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるかチェック
        const num = Number(trimmedPart);
        if (!isNaN(num)) {
            // 値が64bit整数に収まるか、および最大値を更新する
            if (num >= -(2**63) && num <= (2**63 - 1)) {
                count++;
                if (num > max) {
                    max = num;
                }
            }
        }
    }

    // カウントされた要素数と最大値を標準出力に出力
    process.stdout.write(`count=${count} max=${max}\n`);
});
