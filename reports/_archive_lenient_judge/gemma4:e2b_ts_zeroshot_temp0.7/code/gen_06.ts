/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');

    let count = 0;
    let sum = 0;
    const seen = new Set<number>();

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるかチェックし、変換する
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、かつ重複していないかチェック
        if (!isNaN(num)) {
            // 制約上、64bitの範囲に収まることが期待されるが、念のため数値として扱う
            if (!seen.has(num)) {
                seen.add(num);
                count++;
                sum += num;
            }
        }
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
