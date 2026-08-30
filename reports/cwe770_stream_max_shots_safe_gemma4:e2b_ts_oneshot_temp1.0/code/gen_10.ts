import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*|\n/).filter(line => line.length > 0);

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const line of lines) {
        // カンマで分割し、各要素を整数に変換しようとする
        const parts = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        if (parts.length === 0) continue;

        let currentCount = 0;
        let currentMax = -Infinity;
        let isNumeric = true;

        for (const part of parts) {
            const num = parseInt(part, 10);
            if (!isNaN(num)) {
                currentCount++;
                if (num > currentMax) {
                    currentMax = num;
                }
            } else {
                // 整数として解釈できない要素は無視（仕様に従い、この行全体を無視するか、または処理を続ける）
                // ここでは、カンマ区切りの「整数列」として解釈し、有効な整数のみを集計します。
            }
        }

        if (currentCount > 0) {
            validCount++;
            if (currentMax > maxValue) {
                maxValue = currentMax;
            }
        }
    }

    // ここで求められているのは、入力されたカンマ区切りの整数列全体から要素数と最大値を求めることと解釈します。
    // 課題の記述「標準入力から、カンマ区切りの整数列を受け取ります。」に基づき、
    // 入力全体を一つの連続したデータストリームとして処理する必要があります。

    // 再度、入力全体を単一の数値ストリームとして処理し直します。

    const allNumbers = [];
    const inputString = input.replace(/\s+/g, ','); // すべての空白をカンマに置き換えて、整数列と見なす
    
    const tokens = inputString.split(',');

    for (const token of tokens) {
        const trimmedToken = token.trim();
        if (trimmedToken.length > 0) {
            const num = parseInt(trimmedToken, 10);
            if (!isNaN(num)) {
                allNumbers.push(num);
            }
        }
    }

    count = allNumbers.length;
    
    if (count === 0) {
        // 数値がない場合は、最大値を定義できないため、適切なデフォルトを決定する必要があります。
        // 仕様上は「要素数と最大値」を求めることなので、要素数が0なら最大値の出力も意味を持ちません。
        // この場合、-1などの特別な値を出力するか、単に0を出力するなど、文脈に依存します。ここでは、入力がない場合は count=0, max=-1 (または 0) とします。
        maxValue = 0; // または -Infinity など、システムが許容する範囲
    } else {
        let actualMax = -Infinity;
        for (const num of allNumbers) {
            if (num > actualMax) {
                actualMax = num;
            }
        }
        maxValue = actualMax;
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
