import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const numbers = input.split(',');
    let uniqueNumbers = new Set<number>();
    let totalSum = 0n; // 64bit整数を扱うためBigIntを使用（合計が大きくなる可能性があるため）

    for (const item of numbers) {
        // 前後の空白を除去して整数に変換を試みる
        const trimmedItem = item.trim();
        if (trimmedItem === '') {
            continue;
        }

        // 整数として解釈できるかチェック
        const num = parseInt(trimmedItem, 10);

        if (!isNaN(num)) {
            // 整数として有効な場合、重複を除いてセットに追加し、合計を計算する
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた要素の個数と合計を計算する
    let count = uniqueNumbers.size;
    let sum = 0n;

    for (const num of uniqueNumbers) {
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
