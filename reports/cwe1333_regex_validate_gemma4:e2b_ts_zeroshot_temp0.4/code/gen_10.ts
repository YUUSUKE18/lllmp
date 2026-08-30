import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("valid=0");
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視して処理
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容するが、それ以外は数字とカンマのみで構成されている必要がある
        // 正規表現で検証する。
        // ^: 行の開始
        // [0-9,]*: 0から9の数字またはカンマが0回以上続く
        // $: 行の終了
        // この正規表現だけでは「1個以上の数字列がカンマで区切られている」ことを保証しないため、
        // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。

        // 妥当性の定義: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた要素がすべて整数である、という条件を満たせば良い。
        // 妥当な行は、カンマで区切られた要素がすべて整数である、という条件を満たす。

        // 1. カンマで区切られた部分を分割する
        const parts = trimmedLine.split(',');

        if (parts.length === 0) {
            // これは空行で既に除外されているはずだが、念のため
            continue;
        }

        // 2. 各部分が空でないことを確認し、すべて整数であるか確認する
        let isValid = true;
        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === "") {
                // カンマが連続している、または先頭/末尾にカンマがある場合（末尾のカンマは許容されるが、空の要素は許容されない）
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                // これは、カンマで区切られた要素がすべて数字列で構成されている必要があることを意味する。
                // 例: "1,2,3" -> ["1", "2", "3"] (OK)
                // 例: "1,,2" -> ["1", "", "2"] (NG)
                // 例: "1," -> ["1", ""] (NG, 空の要素がある)
                isValid = false;
                break;
            }

            // 数字列であるか確認
            if (!/^\d+$/.test(trimmedPart)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
