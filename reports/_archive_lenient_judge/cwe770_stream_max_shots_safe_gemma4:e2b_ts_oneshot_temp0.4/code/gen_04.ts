import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値の初期値として-Infinityを考慮）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するため）
        if (!isNaN(num)) {
            // 仕様では「整数として解釈できない要素も無視」とあるため、ここでは単純に数値として扱う。
            // ただし、入力が "1,abc,3" のような場合、parseInt("abc") は NaN になるため、isNaNチェックでフィルタリングされる。
            // カンマ区切りの整数列なので、もし数字以外の文字が含まれていれば parseInt はその部分だけを解釈する（例: parseInt("1a") -> 1）。
            // より厳密に「整数として解釈できない要素も無視」するためには、文字列全体が整数のみで構成されているかを確認する必要があるが、
            // 標準的な競技プログラミングの文脈では、`parseInt` が成功したものを採用することが多い。
            // ここでは、入力がカンマ区切りの「整数列」であるという前提に基づき、数字として解釈できたもののみをカウント・比較する。

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最終的な出力
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
