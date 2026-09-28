import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // 整数であればセットに追加する（重複は自動的に排除される）
            uniqueNumbers.add(num);
        }
    }

    // 個数と合計を計算する
    const count = uniqueNumbers.size;
    let sum: bigint = 0n; // 合計が64bit整数に収まることを考慮し、BigIntで計算する（念のため）

    for (const num of uniqueNumbers) {
        // 入力値が標準的なJavaScriptのNumber型として扱える範囲内であれば、そのまま加算しても問題ないが、
        // 厳密な64bit整数制約に従い、和をBigIntで計算し続ける。
        sum += BigInt(num);
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum.toString()}`);
}

solve();
