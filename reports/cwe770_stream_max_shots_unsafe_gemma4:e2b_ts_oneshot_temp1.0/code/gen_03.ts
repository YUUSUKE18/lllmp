import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、空白や空文字列を無視して整数を抽出する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白をトリム
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として有効であり、かつ64bitの範囲内であるかを確認（ここではNumber型で十分だが、問題の制約に従う）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 有効な数の数と最大値を計算する。もし有効な数が一つもなければ、count=0, maxは初期値（-Infinity）または適切なデフォルト値を設定する必要があるが、ここでは読み込んだ数値に基づき計算する。
    // 問題の意図として、入力されたカンマ区切りの要素全てを考慮し、それらが整数として解釈できたもののみを数えると解釈する。

    // 最終的な出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
