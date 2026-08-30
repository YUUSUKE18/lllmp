import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値は定義できないため-Infinityなど）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が純粋な整数表現であること）
        if (!isNaN(num) && String(num) === trimmedPart) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 整数として解釈できた要素のみをカウントする（仕様の「要素数」の解釈について、ここではカンマ区切りの要素数をそのまま採用する）
    // ただし、「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」という指示に基づき、有効な整数のみを対象とする。

    // カウントは、入力されたカンマ区切りの要素の総数ではなく、実際に処理した有効な整数の数と解釈する。
    // 例: "1,a,2" -> 2個の整数 (1, 2)
    const finalCount = validCount;

    process.stdout.write(`count=${finalCount} max=${maxValue}\n`);
}

solve();
