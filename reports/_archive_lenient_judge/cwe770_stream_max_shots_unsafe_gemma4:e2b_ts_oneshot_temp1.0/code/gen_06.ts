import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をスペースで区切って処理するために一時的に整形する（ここではそのままカンマ区切りとして扱う）
    // 標準入力から読み込んだ文字列をカンマで分割して整数配列にする
    const parts = input.split(',');
    
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、64bitの範囲内であるか確認（parseIntは自動的に安全な範囲で処理されることが多いが、念のためチェック）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
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
