import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合は適切に処理
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        // 整数として解釈でき、64bit範囲内であることを確認（ここではparseIntが十分と仮定）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が存在しない場合（入力が空、または数値が含まれていなかった場合）、
    // 仕様に従ってどのように扱うか。ここでは入力に有効な整数があった場合にのみcountとmaxを出力する。
    if (count === 0) {
        // 数値が一つもなかった場合
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        // 最大値が見つかった場合
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
