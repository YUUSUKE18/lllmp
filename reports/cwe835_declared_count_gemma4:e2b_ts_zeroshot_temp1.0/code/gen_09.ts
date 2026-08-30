import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

let lines: string[] = [];
let count: number = 0;
let sum: bigint = 0n;

rl.on('line', (line) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') {
        return;
    }

    if (count === 0) {
        // 1行目: 整数の個数
        const num = parseInt(trimmedLine, 10);
        if (!isNaN(num)) {
            count = num;
        }
    } else {
        // 2行目以降: 整数
        const numVal = parseInt(trimmedLine, 10);
        if (!isNaN(numVal)) {
            // 実際に読み取れた整数だけを対象とする
            sum += BigInt(numVal);
        }
    }
});

rl.on('close', () => {
    // 読み取れた個数と合計を報告
    console.log(`count=${count} sum=${sum.toString()}`);
});
