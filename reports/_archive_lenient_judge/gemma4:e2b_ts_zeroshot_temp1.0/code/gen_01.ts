import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = line.trim().split(',');
    let numbers: number[] = [];
    let sum: bigint = 0n;
    let count: number = 0;

    for (const part of parts) {
        if (part === '') continue; // 空の要素は無視

        // parseInt/Number()で整数として解釈できるか試みる
        const num = Number(part);
        if (!isNaN(num) && String(num) === part) {
            // 文字列として与えられたものと数値変換されたものが完全に一致するか確認（念のため）
            numbers.push(num);
        }
    }

    // 重複を除いた整数のみを処理するためにSetを使用
    const uniqueNumbers = Array.from(new Set(numbers));

    let finalCount = 0;
    let finalSum = 0n;

    for (const num of uniqueNumbers) {
        finalCount++;
        finalSum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${finalCount} sum=${finalSum}`);

    rl.close();
});
