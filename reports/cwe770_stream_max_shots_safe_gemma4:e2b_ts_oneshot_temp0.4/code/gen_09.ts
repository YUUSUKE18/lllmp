import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値が定義できないため）
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

        // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が純粋な整数表現であること）
        if (!isNaN(num) && String(num) === trimmedPart) {
            validCount++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 処理された要素数と最大値を計算する。
    // 仕様では「カンマ区切りの整数列を受け取る」ため、読み込んだ有効な整数の個数と最大値を求める。
    // 空要素や非整数は無視する。

    if (validCount === 0) {
        // 有効な整数が一つもなかった場合。この場合の最大値の定義は文脈依存だが、
        // 64bit範囲を考慮し、もし入力が空または無効な値のみなら、最大値を-Infinityとするのが妥当。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${validCount} max=${maxValue}\n`);
    }
}

solve();
