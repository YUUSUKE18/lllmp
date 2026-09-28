import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let numbers: number[] = [];

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェックし、変換する
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 重複を除いた整数のみを抽出する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計は64bit (JavaScriptのNumberで安全だが、明示的にBigIntを使うことで念のため)

    for (const num of uniqueNumbers) {
        count++;
        // sumは64bitに収まることが保証されているため、ここでは通常の数値計算で十分だが、
        // 最終的な出力形式に合わせてBigIntとして保持し、必要に応じて変換する。
        sum += BigInt(num);
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
