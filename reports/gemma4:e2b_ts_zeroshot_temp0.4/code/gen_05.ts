import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を除去して整数として解釈可能かチェック
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);
        
        // isNaNチェックと、元の文字列が数字のみで構成されているかの確認（厳密な整数のみを扱うため）
        if (!isNaN(num) && String(num) === trimmedPart) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum = 0n; // 合計は64bit整数に収まるため、BigIntを使用しても安全だが、問題の制約上標準のnumber型でも十分。ここでは念のためBigIntで扱う。

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
