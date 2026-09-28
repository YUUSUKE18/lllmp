import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let totalSum: bigint = 0n;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 数値として解析を試みる。整数のみを対象とする。
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数値（小数点以下がない）であることを確認する
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 64bit整数の範囲に収まることを前提として Set に追加し、合計を計算する
            uniqueNumbers.add(num);
            totalSum += BigInt(num);
        }
    }

    const count = uniqueNumbers.size;
    const sum = totalSum;

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
