import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、前後の空白も考慮して要素を抽出
    const parts = input.trim().split(',').map(s => s.trim()).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const num = parseInt(part, 10);
        // 整数として解釈でき、かつ64bitの範囲内（一般的なJavaScriptのNumber型で十分）かを確認
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 厳密に count=<個数> max=<最大値> を出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
