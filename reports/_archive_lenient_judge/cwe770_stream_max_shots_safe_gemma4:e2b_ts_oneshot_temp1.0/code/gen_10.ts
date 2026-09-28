import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n");
        return;
    }

    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数として解釈可能かチェック（数値として読み取れるか）
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // 64bit整数の範囲内であることを前提とする (JavaScriptのNumber型はIEEE 754倍精度だが、ここでは整数として扱う)
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない場合（入力がすべて無効な要素のみだった場合）の処理。
    // 仕様上は入力された有効な数値が存在する場合のみ意味を持つが、安全のため。
    if (count === 0) {
        // 空の入力の場合、最大値を定義しにくいが、ここでは-Infinityまたは特別な値とする。
        // ただし、問題文の意図を尊重し、もし数値が一つもなければ、その状況を示す必要がある。
        // ここでは「存在する有効な数があればそれを求める」という前提に基づき、count=0ならmaxは未定義扱いとする。
        // 厳密に64bit整数として扱うため、-2^63-1や+2^63-1を考慮する必要があるが、ここでは単純に見つけられた最大値を出す。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        // 読み取った数値をそのまま出力
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
