import * as process from "process";

function solve() {
    const input = process.stdin.readSync();
    if (!input) return;

    const lines = input.trim().split(/\s*,\s*/).filter(s => s.length > 0);

    let count = 0;
    let maxValue = -Infinity;

    for (const line of lines) {
        // カンマ区切りの整数列を処理するのではなく、入力全体がカンマ区切りの整数列であると解釈し、
        // 各要素を個別に処理する。
        const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);

        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (!isNaN(num)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 仕様の解釈：「カンマ区切りの整数列を受け取る」という指示を、標準入力全体がカンマ区切りの整数の並びであると解釈し、
    // その中の全ての数から要素数と最大値を求める。
    // もし入力が「1,5,2,8」のような形式であれば、それらを個別の数値として扱うべき。

    // 再度、より一般的な「空白区切りまたはカンマ区切りの整数列を読み込む」という文脈で解釈する。
    // 標準入力全体を一つの文字列として扱い、その中の全ての数値を抽出する。

    const allNumbers = [];
    const tokens = input.split(/[\s,]+/).filter(token => token.length > 0);

    for (const token of tokens) {
        const num = parseInt(token, 10);
        if (!isNaN(num)) {
            allNumbers.push(num);
        }
    }

    const finalCount = allNumbers.length;
    let finalMaxValue = -Infinity;

    if (finalCount > 0) {
        for (const num of allNumbers) {
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    } else {
        // 要素がない場合、最大値は定義できないが、仕様上問題ない。ここでは-1や0などで対応するが、-Infinityが適切。
        finalMaxValue = -1; // または適切なデフォルト値。ここでは入力があった場合にのみ意味を持つと仮定し、空の場合は処理を続行。
    }

    process.stdout.write(`count=${finalCount} max=${finalMaxValue}\n`);
}

solve();
