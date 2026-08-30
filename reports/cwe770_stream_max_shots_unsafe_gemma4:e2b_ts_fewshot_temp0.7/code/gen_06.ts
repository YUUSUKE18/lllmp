import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(",");
    let count = 0;
    let maxVal = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純にparseIntの結果を使う）
        if (!isNaN(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            hasValidNumber = true;
        }
    }

    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値は定義できないため、仕様に合わせて適切な値を設定する。
        // 問題文の制約から、入力が空または無効な値のみの場合を想定し、ここでは最初の例に倣い0,0とするか、あるいは-Infinityのような概念が必要になるが、整数列なので0を設定する。
        // 厳密には、数値が存在しない場合は最大値をどう扱うかが重要だが、ここでは全ての要素が無視される場合、count=0となるため、maxValの初期値に依存する。
        // 入力が空の場合（例: ""）、count=0, max=-Infinityになる可能性がある。
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
