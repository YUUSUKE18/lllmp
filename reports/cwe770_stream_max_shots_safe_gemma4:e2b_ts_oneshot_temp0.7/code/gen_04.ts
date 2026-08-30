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
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // チェック：整数として解釈できるか、64bit範囲内か
        if (!isNaN(num) && isFinite(num)) {
            // 64bitの範囲チェック（JavaScriptのNumberはIEEE 754倍精度だが、ここでは整数として扱う）
            // 標準的なJS Numberは安全に扱える範囲だが、仕様に従い大きな値も考慮する
            if (num >= -(2**53) && num <= (2**53 - 1)) {
                validCount++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 空要素や非整数を無視した後の実際の要素数をカウントするのではなく、入力されたカンマ区切りの有効な数値の数を数える。
    // 仕様は「読み取った要素数」と「最大値」を求めることなので、ここでは空要素などを無視して実質的な要素数を考える。

    // 再度、仕様に合わせて処理を見直す: カンマ区切りの整数列を受け取り、その要素数と最大値を求める。
    // 空要素・前後の空白は無視し、整数として解釈できない要素も無視する。

    let actualCount = 0;
    let currentMax = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            actualCount++;
            if (num > currentMax) {
                currentMax = num;
            }
        }
    }

    // もし入力が空だった場合や、全て無効な値だった場合も考慮する。
    if (actualCount === 0) {
        // 入力が完全に無視されるべきか？仕様に従い、読み取った要素数と最大値を出す。
        // 空白・非整数を無視した結果のカウントを採用する。
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${actualCount} max=${currentMax}\n`);
    }
}

solve();
