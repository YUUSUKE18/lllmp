import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(line => line.length > 0);

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const line of lines) {
        const num = parseInt(line, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            isValidInput = true;
        }
    }

    if (count === 0) {
        // 空の入力の場合、仕様に厳密に従うため、ここでは何かを出力しないか、
        // または定義されていない値を設定する必要があるが、最大値が存在しない場合は
        // -Infinity や 0 などが考えられる。ここでは入力された整数のみを対象とする。
        // 入力が空または無効な場合、count=0, maxValue=-Infinity となる。
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
