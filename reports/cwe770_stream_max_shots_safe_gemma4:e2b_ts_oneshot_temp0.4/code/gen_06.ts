import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック：整数として解釈できるか、64bit範囲内か
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            validCount++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    // 整数として解釈できた要素のみをカウントする（仕様の解釈：カンマ区切りの要素数と最大値）
    // ここでは、入力されたカンマ区切りの要素数を「要素数」とし、それらの最大値を求める。
    // ただし、「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」という指示を考慮すると、
    // 実際に処理した有効な整数の個数と最大値を求めるのが自然である。

    // 再度、仕様を厳密に解釈する: 「カンマ区切りの整数列を受け取ります。」
    // これは、入力文字列全体が「整数,整数,...」の形式であることを示唆している。
    // したがって、入力された要素数と最大値を求める。

    let finalCount = 0;
    let finalMax = -Infinity;
    let isFirstValid = true;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num) && Number.isSafeInteger(num)) {
            finalCount++;
            if (isFirstValid || num > finalMax) {
                finalMax = num;
                isFirstValid = false;
            }
        }
    }


    // もし入力が空または全て無効な場合、最大値は定義できない（-Infinity）とする。
    if (finalCount === 0) {
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
    }
}

solve();
