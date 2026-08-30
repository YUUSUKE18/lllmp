import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈可能かチェック
        if (/^-?\d+$/.test(trimmedPart)) {
            const num = parseInt(trimmedPart, 10);
            // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型（IEEE 754倍精度浮動小数点数）が安全に扱える範囲内であるため、ここではそのまま比較します。
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            hasValidNumber = true;
        }
    }

    // すべての要素が数値として解釈できた場合のみ出力する（仕様上は空要素や無効な要素を無視してカウント・最大値を求めるため、count > 0 なら出力）
    if (count > 0) {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    } else if (input.length > 0) {
        // 入力があったが有効な整数が一つもなかった場合（例: ",," や "abc" のみ）
        // この場合、count=0, max=-Infinity が適切だが、入力に数値以外の要素が含まれていた場合の挙動を考慮し、
        // 厳密には読み取れた数のみをカウントする。ここでは、有効な数が一つもなかった場合は count=0 を出力する。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        // 入力が空だった場合（trim()で空文字列になる）
         process.stdout.write(`count=0 max=-Infinity\n`);
    }
}

solve();
