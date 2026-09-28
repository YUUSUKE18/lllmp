import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではNumber型が扱える範囲で十分）
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素の数と最大値を計算する。
    // 問題文の指示「カンマ区切りの整数列を受け取ります」を厳密に解釈すると、
    // 入力全体が「値1,値2,...」という形式であり、その中の数値のみをカウントすべきか、
    // それとも入力された要素数と最大値を求めるのか曖昧です。
    // 例の形式に合わせて、「カンマ区切りの整数列を受け取り、それらの要素数と最大値を求める」と解釈し、
    // 入力文字列から抽出された有効な整数のみを対象とします。

    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値は定義できませんが、入力があった場合は0とするか、-Infinityとするか。
        // 例に倣い、もし数値が存在しないなら0, 0とするのが安全かもしれません。
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
