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

    // 64bit整数の範囲に収まることを前提とするが、ここでは単純な最大値を出力する。
    // 負の無限大は出力形式に合わないため、入力がない場合は適切なデフォルト値を設定する必要がある。
    if (count === 0) {
        // 入力が空または無効な場合、仕様に従ってどうすべきか？
        // ここでは、もし入力が完全に無視された場合の安全策として、最大値は定義できないことを示すために-Infinityを保持するが、
        // 厳密に「整数」の範囲で考えるなら、入力がない場合は0またはエラー処理が必要。
        // 例1の形式に従い、ここでは読み取った有効な要素に基づいて出力する。
        process.stdout.write(`count=0 max=-Infinity\n`); // または count=0 max=0 など、文脈によるが、最大値が存在しないことを示す
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
