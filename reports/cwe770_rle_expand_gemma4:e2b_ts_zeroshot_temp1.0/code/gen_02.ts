import * as readline;

function solve() {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        encoding: 'utf8'
    });

    let lines = input.getLines();
    const inputString = lines.join('\n');

    if (!inputString) {
        return;
    }

    // 入力をカンマで分割し、各要素を解析する
    const parts = inputString.trim().split(',');
    let totalCount = 0;
    let totalSum = 0;

    for (const part of parts) {
        if (part.trim() === '') continue;

        const match = part.match(/^(\d+):(\d+)$/);
        if (match) {
            const value = parseInt(match[1], 10);
            const count = parseInt(match[2], 10);

            if (count >= 0) {
                totalCount += count;
                totalSum += value * count;
            }
        }
    }

    console.log(`count=${totalCount} sum=${totalSum}`);
}

solve();
