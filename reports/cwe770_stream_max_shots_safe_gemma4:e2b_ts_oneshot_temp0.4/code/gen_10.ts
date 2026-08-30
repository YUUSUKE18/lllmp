import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値の初期値として-Infinityを想定）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるかチェック
        if (/^-?\d+$/.test(trimmedPart)) {
            const num = parseInt(trimmedPart, 10);
            // 値が64bit整数の範囲に収まることを確認（JavaScriptのNumberはIEEE 754倍精度だが、ここでは入力値の範囲を考慮する）
            // 問題文の制約に従い、読み込んだ値をそのまま扱う。
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できた要素数と最大値を計算し出力
    process.stdout.write(`count=${validCount} max=${maxValue}\n`);
}

solve();
