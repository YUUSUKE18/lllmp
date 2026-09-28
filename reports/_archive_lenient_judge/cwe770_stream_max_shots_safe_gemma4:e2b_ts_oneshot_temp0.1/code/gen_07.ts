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

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が純粋な整数表現であること）
        if (!isNaN(num) && String(num) === trimmedPart) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（入力がすべて無効な場合）、仕様に合わせるため、ここでは-Infinityをそのまま出力する。
    // ただし、問題文の制約から「64bit整数の範囲」を考慮すると、もし入力が空または全て無効なら、
    // 厳密な最大値が存在しないことを示すために適切な値を出す必要がある。
    // ここでは、入力された有効な数値のみを考慮し、一つも有効な数値がなかった場合は、
    // 最大値の初期値である-Infinityを出力する。

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
