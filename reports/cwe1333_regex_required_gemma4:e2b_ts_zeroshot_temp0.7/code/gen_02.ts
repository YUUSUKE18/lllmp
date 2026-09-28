import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    const lines = input.split('\n');
    let validCount = 0;

    // 正規表現の定義
    // ^\s*          : 行の先頭の任意の空白
    // (?:           : 非キャプチャグループの開始（数字とカンマのパターン全体）
    //   \d+         : 1つ以上の数字
    //   (?:,\d+)*   : カンマと1つ以上の数字の繰り返し（カンマ区切りのリスト）
    // )             : グループの終わり
    // \s*$          : 行末の任意の空白
    // この正規表現は「1個以上の数字がカンマで区切られている」ことを確認する。
    // 末尾のカンマは許容されるため、最後の要素の後にカンマがあっても許容する。
    // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
    // 少なくとも一つの数字が含まれていることを保証する。
    const validRegex = /^\s*(?:\d+(?:,\d+)*)\s*$/;

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 正規表現で判定
        if (validRegex.test(line)) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
