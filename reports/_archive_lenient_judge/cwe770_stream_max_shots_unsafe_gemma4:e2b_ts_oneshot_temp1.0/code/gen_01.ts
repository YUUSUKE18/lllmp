import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();

    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を整数に変換する
    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できない要素は無視
        if (Number.isNaN(num)) continue;

        count++;
        if (num > maxVal) {
            maxVal = num;
        }
    }

    // 要素数が0の場合、最大値は定義されないが、問題の制約から入力があった場合は最大値が出力される。
    // 空要素や非数値要素を無視した後の実数のみを考慮する。もし全ての要素が無視された場合（例えば入力がカンマのみ）、count=0, max=-Infinityとなるが、
    // 入力が整数列であると仮定し、有効な整数が見つかった場合に最大値を求めることに焦点を当てる。
    if (count === 0) {
        // 入力に有効な整数が一つもなかった場合
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
