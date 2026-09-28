import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let totalSum = 0n; // 合計は64bit整数（BigInt）として扱う

    for (const part of parts) {
        // 空文字列や空白を無視して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈できるかチェック
        const num = parseInt(trimmedPart, 10);

        // 数値として有効で、重複を除いた整数であるかチェック
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた個数を計算
    const count = uniqueNumbers.size;

    // 合計を計算
    let sum = 0n;
    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
