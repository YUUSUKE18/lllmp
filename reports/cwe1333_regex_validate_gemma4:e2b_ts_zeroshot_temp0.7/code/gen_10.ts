import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    let validCount = 0;

    for (const line of input) {
        // 行の前後の空白を無視
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマで区切られた文字列が、少なくとも1つ以上の数字列を含むことを意味する。
        // 例: "1,2,3" -> 妥当
        // 例: "1," -> 妥当 (数字列 "1" と空の数字列 "" がカンマで区切られていると解釈できるが、仕様は「1個以上の数字列」なので、数字列が1つ以上必要)
        // 仕様: 「1 個以上の数字列がカンマで区切られて並んでいること」
        // 数字列が空でないことを確認する。

        // カンマで分割
        const parts = trimmedLine.split(',');

        if (parts.length === 0) {
            // これはtrimmedLineが空でないのに発生しないはずだが、念のため
            continue;
        }

        let hasNumberColumn = false;
        for (const part of parts) {
            // 各部分が数字列であるかチェック (空文字列でないこと)
            if (part.trim() !== "") {
                hasNumberColumn = true;
            }
        }

        if (hasNumberColumn) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
