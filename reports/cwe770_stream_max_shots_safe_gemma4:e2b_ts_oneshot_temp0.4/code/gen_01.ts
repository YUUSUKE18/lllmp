import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 要素数 (count) の処理
        if (validCount < 2) {
            // 最初の要素はカウントとして扱う
            try {
                const num = parseInt(trimmedPart, 10);
                if (!isNaN(num)) {
                    count = num;
                    maxVal = num;
                    validCount++;
                }
            } catch (e) {
                // 数値変換エラーは無視
            }
        } else {
            // 2番目以降の要素は最大値の比較対象として扱う
            try {
                const num = parseInt(trimmedPart, 10);
                if (!isNaN(num)) {
                    count++;
                    if (num > maxVal) {
                        maxVal = num;
                    }
                }
            } catch (e) {
                // 数値変換エラーは無視
            }
        }
    }

    // 最終的なカウントと最大値を決定するロジックを再整理する。
    // 仕様の解釈：「カンマ区切りの整数列」が与えられた場合、そのリストの要素数を求め、その中の最大値を求める。
    // 例: "1,5,2" -> 要素数=3, 最大値=5

    let actualCount = 0;
    let actualMax = -Infinity;

    const numbers = [];
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        
        try {
            const num = parseInt(trimmedPart, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        } catch (e) {
            // 無効な要素は無視
        }
    }

    actualCount = numbers.length;

    if (actualCount === 0) {
        actualMax = 0; // 空のリストの場合、最大値は0とするか、定義に依存するが、ここでは安全のため0とする。
    } else {
        actualMax = numbers[0];
        for (let i = 1; i < actualCount; i++) {
            if (numbers[i] > actualMax) {
                actualMax = numbers[i];
            }
        }
    }

    process.stdout.write(`count=${actualCount} max=${actualMax}\n`);
}

solve();
