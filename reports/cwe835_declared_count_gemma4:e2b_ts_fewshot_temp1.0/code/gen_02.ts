const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

let lines: string[] = [];
let lineIndex = 0;
let count: number = 0;
let sum: bigint = 0n;

rl.on('line', (line) => {
    if (lineIndex === 0) {
        // 1行目: 続く整数の個数
        const num = parseInt(line.trim(), 10);
        if (!isNaN(num) && num >= 0) {
            count = num;
        } else {
            // 最初の行が不正な場合は無視するが、後の処理のために続行する
        }
    } else if (lineIndex < count) {
        // 2行目以降: 整数
        const num = parseInt(line.trim(), 10);
        if (!isNaN(num)) {
            sum += BigInt(num);
        }
    }
    lineIndex++;
});

rl.on('close', () => {
    // 読み取れた整数のみを対象とする。
    // 実際には、readlineは行ごとに処理するため、読み取れたデータ（sumとcount）を出力する。
    // sumはBigIntとして保持している。
    console.log(`count=${count} sum=${sum.toString()}`);
});
