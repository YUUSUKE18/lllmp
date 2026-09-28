import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    // カンマで分割し、各要素をトリムしてフィルタリングする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは単純にNumber型で扱う）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウントし、最大値を求める
    // 仕様では「カンマ区切りの整数列を受け取る」ため、ここでは入力された全ての有効な整数を数える。
    // ただし、例の形式に合わせるため、入力された文字列から抽出した有効な整数の数をカウントする。

    // 再度、より厳密に仕様を満たすように処理を調整する（カンマ区切りで与えられた要素が全て整数であると仮定し、その数と最大値を求める）
    let finalCount = 0;
    let finalMaxValue = -Infinity;

    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => parseInt(s, 10))
        .filter(n => !isNaN(n));

    finalCount = numbers.length;

    if (finalCount === 0) {
        // 数値が一つもなかった場合の処理（最大値の定義に依存するが、ここでは-Infinityを扱う）
        // 問題文の例に従い、もし数値が存在しなければ、その最大値は未定義となる。
        // ただし、入力された要素数と最大値を求めるため、0個の場合、最大値は通常扱われないか、あるいは最小値として扱う。
        // ここでは、入力された有効な整数の最大値を求めることに焦点を当てる。
        finalMaxValue = 0; // 数値がない場合は0とする（安全策）
    } else {
        finalMaxValue = Math.max(...numbers);
    }


    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
