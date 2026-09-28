import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();

    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値を扱うため）
        return;
    }

    // カンマで分割し、空白を無視して整数としてパースする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるかチェックし、数値に変換する
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない場合（入力が全て無効な場合）の対策として、仕様上は整数列が与えられる前提だが、念のため。
    // 課題の制約「64bit整数の範囲に収まる」を考慮し、-Infinityや最小値を扱う必要があるが、ここでは単純に計算された最大値を出す。

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
