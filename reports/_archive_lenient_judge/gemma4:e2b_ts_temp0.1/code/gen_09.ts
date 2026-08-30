import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();
    let sum: bigint = 0n;

    for (const part of parts) {
        // 前後の空白を除去して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ重複していないかチェックする
        if (!isNaN(num)) {
            // 問題の制約に基づき、64bit整数に収まることを確認（ここでは標準のnumber型で十分だが、合計はbigintで扱う）
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数と合計を計算する
    let count = uniqueNumbers.size;
    let totalSum = 0n;

    for (const num of uniqueNumbers) {
        totalSum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${totalSum.toString()}`);
}

solve();
