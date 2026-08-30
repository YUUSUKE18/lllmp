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
        if (trimmedPart) {
            const num = parseInt(trimmedPart, 10);
            // 整数として解釈でき、かつNaNでないことを確認する
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求める
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum = 0;

    for (const num of uniqueNumbers) {
        // 合計が64bitに収まることを前提とする（JavaScriptのNumber型はIEEE 754倍精度で、安全な整数範囲は2^53-1だが、ここでは64bitの制約に従う）
        sum += num;
        count++;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
