import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（最大値の初期値として-Infinityを想定）
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるかチェック（NaNでないこと、そして元の文字列が数字のみで構成されていることを確認するため、ここでは単純にparseIntの結果をチェックする）
        // 仕様では「整数として解釈できない要素も無視」とあるため、数値変換が成功したものをカウント対象とする。
        if (!isNaN(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 64bit整数の範囲に収まることを前提としているため、-Infinityが適切
    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
