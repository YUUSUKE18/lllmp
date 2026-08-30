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
    let sum = 0;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (!trimmedPart) continue;

        // 整数として解釈可能かチェックし、変換する
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、かつ重複していないかチェック
        if (!isNaN(num)) {
            // 仕様に基づき、64bit整数として扱うため、Number型（JavaScriptの標準）で十分だが、
            // 合計が大きくなる可能性を考慮し、ここでは通常の数値演算を行う。
            // 64bit整数範囲内であるという制約は、入力値がその範囲に収まることを前提とする。

            if (!uniqueNumbers.has(num)) {
                uniqueNumbers.add(num);
                sum += num;
            }
        }
    }

    const count = uniqueNumbers.size;

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
