import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 前後の空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart) {
            const num = parseInt(trimmedPart, 10);
            // 数値として解釈でき、かつNaNでないことを確認する
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を取得
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算
    let count = 0;
    let sum: bigint = 0n; // 合計は64bitに収まるが、念のためBigIntで扱う（仕様上は数値でも問題ないが安全のため）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
