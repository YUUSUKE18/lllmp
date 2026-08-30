import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック：整数として解釈できるか、かつ64bit範囲内か（ここではJSのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 空要素や非整数を無視する処理は上記のループで実現済み。
    // ただし、入力が完全に空の場合（partsが空または空白のみの場合）も考慮する必要がある。
    if (count === 0) {
        // 入力が空または無効な数値のみだった場合、最大値は定義できないか、あるいは0とするか？
        // 仕様に基づき、有効な要素がない場合は count=0, max=0 とするのが自然だが、
        // 厳密には「読み込んだ整数列」から最大値を求めるため、ここではcount=0として扱う。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
