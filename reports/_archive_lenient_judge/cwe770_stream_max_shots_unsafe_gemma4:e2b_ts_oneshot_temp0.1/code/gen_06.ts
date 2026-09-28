import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではparseIntの範囲に依存するが、問題の制約に従う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様では「カンマ区切りの整数列を受け取る」ため、入力された全ての数値の数を数えるのではなく、有効な整数の数を数えるのが自然。
    // ただし、「要素数」が何を指すか（入力されたカンマ区切り全体の数か、有効な整数の数か）を明確にする必要がある。
    // 例として、入力されたカンマ区切りの要素の総数を「要素数」とする。

    let totalElements = 0;
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart !== "") {
            totalElements++;
        }
    }


    // 仕様に従い、入力されたカンマ区切りの要素の総数と最大値を求める。
    // 空要素や空白は無視するが、ここではカンマで区切られた要素の数をカウントする。

    let finalCount = 0;
    let finalMax = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            finalCount++;
            if (num > finalMax) {
                finalMax = num;
            }
        }
    }


    process.stdout.write(`count=${finalCount} max=${finalMax}\n`);
}

solve();
