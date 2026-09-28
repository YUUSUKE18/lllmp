import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(line => line.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマ区切りの文字列を個別に処理するのではなく、カンマで区切られた全ての数値を一つのストリームとして扱う必要がある。
        // inputが「1,2,3,4」のような形式の場合、split(',')で配列になり、その要素を整数に変換する。

        const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);

        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (!isNaN(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 上記の処理では、入力が「1,2,3,4」のような一行だと仮定して処理している。
    // 課題文の指示は「カンマ区切りの整数列を受け取ります」なので、標準入力全体を読み込み、その中から全ての数値を抽出する必要がある。

    // 再度、標準入力全体を読み込み、全てを一つのストリームとして扱うように修正する。
    const allInput = input; // すでに readSync で読み込んでいるため、この時点で処理を続ける。

    let totalCount = 0;
    let overallMaxValue = -Infinity;
    
    // 入力文字列全体をカンマで分割し、各要素を整数として処理する。
    const rawNumbers = allInput.split(',');

    for (const item of rawNumbers) {
        const trimmedItem = item.trim();
        if (trimmedItem.length === 0) continue;

        const num = parseInt(trimmedItem, 10);

        if (!isNaN(num)) {
            totalCount++;
            if (num > overallMaxValue) {
                overallMaxValue = num;
            }
        }
    }

    process.stdout.write(`count=${totalCount} max=${overallMaxValue}\n`);
}

solve();
