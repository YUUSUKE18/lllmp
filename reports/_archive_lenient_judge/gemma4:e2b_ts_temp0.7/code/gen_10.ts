import * as readline from 'readline';

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = '';

    for await (const line of rl) {
        input += line + '\n';
    }

    if (!input) {
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.trim().split(',');

    let uniqueNumbers = new Set<number>();
    let totalSum = 0n; // 合計は64bit整数（BigInt）として扱う

    for (const part of parts) {
        // 前後の空白を無視して数値としてパースを試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック
        if (!isNaN(num)) {
            // 数値が有効な整数であるか確認（浮動小数点数や指数表記などを除外するため）
            if (String(num) === trimmedPart) {
                uniqueNumbers.add(num);
            }
        }
    }

    // 重複を除いた個数を計算
    const count = uniqueNumbers.size;

    // 合計を計算（BigIntとして安全に加算）
    for (const num of uniqueNumbers) {
        totalSum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

main().catch(err => {
    // エラー処理はここでは省略するが、通常はログに出力する
});
