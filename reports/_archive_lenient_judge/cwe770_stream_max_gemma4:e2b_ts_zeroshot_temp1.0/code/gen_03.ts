import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック: 数値として解釈可能か、64bit範囲か
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            validCount++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    // 空要素・不正な要素を無視して、有効な要素数と最大値を決定する。
    // 仕様では「カンマ区切りの整数列を受け取る」ため、入力されたものすべてを処理対象とするのではなく、
    // 整数として解釈できたものをカウントし、その中での最大値を求める。

    if (validCount === 0) {
        // 入力が空だったか、整数が一つもなかった場合。ここでは count=0, max=0 とするのが安全。
        console.log("count=0 max=0");
    } else {
        console.log(`count=${validCount} max=${maxVal}`);
    }
}

solve();
