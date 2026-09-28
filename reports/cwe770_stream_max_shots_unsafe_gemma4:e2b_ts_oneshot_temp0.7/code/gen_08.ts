import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムして配列にする
    const parts = input.trim().split(',').map(s => s.trim()).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        // 整数として解釈を試みる
        const num = parseInt(part, 10);
        
        // 整数であり、かつ64bit整数の範囲内であるかを確認（ここではparseIntの範囲に依存するが、問題文の制約に従う）
        if (!isNaN(num)) {
            // 要素数をカウント
            count++;
            
            // 最大値を更新
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力: count=<個数> max=<最大値>
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
