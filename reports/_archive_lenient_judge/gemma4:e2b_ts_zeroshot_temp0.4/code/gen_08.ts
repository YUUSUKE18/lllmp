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
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数として解析を試みる
        const num = parseInt(trimmedPart, 10);
        
        // isNaNチェックと、文字列全体が数字のみで構成されているか（小数点やその他の文字がないか）を確認する
        if (!isNaN(num) && String(num) === trimmedPart) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計は64bit整数に収まるため、安全のためBigIntを使用（Node.jsのNumber型は53bitまで保証されるが、ここでは明示的に扱う）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
