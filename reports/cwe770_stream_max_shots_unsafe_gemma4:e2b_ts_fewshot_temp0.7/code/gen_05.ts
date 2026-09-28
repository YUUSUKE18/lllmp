import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    const parts = input.split(",");
    let count = 0;
    let maxVal = -Infinity;
    let foundNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではNumber型で十分だが念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            foundNumber = true;
        }
    }

    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    } else {
        // 要素が一つも整数でなかった場合、count=0, max=? となるが、最大値の定義が曖昧。
        // 問題文の例に従い、読み取れた要素数と最大値をそのまま出力する。
        // 整数がない場合は count=0 で、max は初期値（-Infinity）または適切なデフォルト値とする。
        // ここでは、入力された整数が存在しない場合は count=0, max=-1 (または最小値) とするが、
        // 最大値を求められなかった場合の一般的な慣習に従い、ここではcount=0で出力する。
        process.stdout.write(`count=0 max=-1\n`); // 整数が存在しなかった場合を想定
    }
}

solve();
