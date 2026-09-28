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

        // カンマ区切りの整数列を想定しているため、ここではすべてが数値であると仮定して処理する。
        // 厳密には「カンマ区切りの整数列」なので、各要素を整数として扱う。
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 空要素・整数として解釈できない要素は無視される。
    if (count === 0) {
        // 入力に有効な整数が一つもなかった場合、最大値は定義できないか、あるいは仕様に応じて0などを選ぶ必要があるが、
        // ここでは入力された数値のみに基づいて計算する。もし入力が空または無効な文字列のみなら count=0, maxの扱いを決定する必要がある。
        // 例として、入力があったが有効な整数がなかった場合は 0 を返す。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
