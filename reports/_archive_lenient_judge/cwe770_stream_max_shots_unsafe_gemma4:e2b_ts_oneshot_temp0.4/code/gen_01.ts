import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマ区切りの文字列を読み込む
    const line = input.toString().trim();
    if (line === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値の初期値として-Infinityを使用）
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = line.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここではNumber型で十分だが念のため）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 厳密に count=<個数> max=<最大値> を出力する
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
