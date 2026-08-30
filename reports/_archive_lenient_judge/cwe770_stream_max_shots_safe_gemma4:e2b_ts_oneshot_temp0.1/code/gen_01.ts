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

    // 64bit整数の範囲に収まることを前提とするが、ここでは標準のNumber型で十分と判断する。
    // もし厳密にBigIntや特定のビット幅を要求する場合は調整が必要だが、一般的な競技プログラミングの文脈ではNumberで十分とされることが多い。

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
