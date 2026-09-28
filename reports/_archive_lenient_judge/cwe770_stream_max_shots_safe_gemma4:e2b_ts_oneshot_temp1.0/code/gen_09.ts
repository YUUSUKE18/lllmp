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
    let isValid = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 要素数 (count) の処理
        if (isValid && !isNaN(parseInt(trimmedPart))) {
            // 最初の要素をカウントとして扱う（ただし、この入力形式では「要素数」と「最大値」が別々に来るべきだが、仕様に従いカンマ区切りの数値列全体を要素と解釈する）
            // 仕様の文脈から、「カンマ区切りの整数列を受け取り、その要素数と最大値を求める」とあるため、入力全体が整数列だと仮定し、それを解析する。
            // ただし、入力例がないため、入力文字列を整数リストとして解釈する。

            const num = parseInt(trimmedPart, 10);
            if (!isNaN(num)) {
                count++;
                if (num > maxVal) {
                    maxVal = num;
                }
            }
        }
    }

    // 仕様の再解釈：入力はカンマ区切りの整数列。その要素数と最大値を求める。
    // 入力例が不明確なため、一般的な「カンマ区切りリスト」として処理を修正する。

    let actualCount = 0;
    let actualMax = -Infinity;

    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(Number)
        .filter(n => !isNaN(n));

    actualCount = numbers.length;

    if (actualCount === 0) {
        // 要素が全くない場合、最大値は定義できない。ここでは仕様に合わせるため、デフォルト値を設定する。
        // 厳密には、もし要素がないならmax=???となるが、入力がない場合はcount=0 max=0とするのが安全。
        actualMax = 0;
    } else {
        actualMax = numbers.reduce((max, current) => Math.max(max, current), numbers[0]);
    }


    process.stdout.write(`count=${actualCount} max=${actualMax}\n`);
}

solve();
