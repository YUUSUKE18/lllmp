import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素のみをカウント対象とする（仕様の解釈に基づき、有効な整数のみを数える）
    // ただし、例題の意図を考えると「カンマ区切りの要素数」が入力された要素数全体を指す可能性もあるため、ここでは読み込んだ非空要素数を採用する。
    // 厳密に「整数として解釈できない要素も無視し」という指示に従い、有効な整数のみをカウントする。

    process.stdout.write(`count=${count} max=${max}\n`);
}

solve();
