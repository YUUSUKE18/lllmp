import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    const numbers: number[] = [];

    for (const part of parts) {
        // 空の文字列や空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart) {
            const num = parseInt(trimmedPart, 10);
            // 整数として解釈でき、かつ有効な数値（NaNではない）であれば追加する
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 重複を除いた整数を求める
    // Setを使って重複を排除する
    const uniqueNumbers = Array.from(new Set(numbers));

    // 個数と合計を計算する
    let count = 0;
    let sum: bigint = 0n; // 合計が64bit範囲に収まることを考慮し、安全のためBigIntを使用（ただし問題の制約上は標準Numberでも十分だが、念のため）

    for (const num of uniqueNumbers) {
        count++;
        sum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
