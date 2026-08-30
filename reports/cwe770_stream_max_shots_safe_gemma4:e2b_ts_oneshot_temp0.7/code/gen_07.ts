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
    let isValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    // 空の入力や数値が存在しない場合のデフォルト処理（問題文の制約から、少なくとも空文字列や非数値が混在する可能性があるため）
    if (count === 0) {
        // カンマ区切りの数字が全くなかった場合。最大値は未定義だが、ここでは0とするか、入力がないと解釈して0を出力する。
        // ただし、仕様上「要素数」と「最大値」を求めるため、要素数が0なら最大値は意味を持たない。
        // 最小の制約として、もし数値が一つもなければ count=0, maxVal=-Infinity となるが、ここでは安全のため count=0, max=0 とする（入力がない場合は最大値は0とする）
         process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
