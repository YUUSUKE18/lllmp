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
        // 行の前後の空白を無視
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているかを確認する
        // ^: 行の先頭
        // [0-9,]*: 0から9の数字またはカンマが0回以上続く
        // $: 行の末尾
        // このチェックだけでは「1個以上の数字列がカンマで区切られている」ことを保証できないため、
        // 区切り文字のルールをより厳密に確認する。

        // 妥当性の定義: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた各要素がすべて整数である、かつ、少なくとも1つの数字列が存在することを意味する。

        // 1. 数字とカンマ以外を含まないかチェック
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 2. 1個以上の数字列が存在するかチェック
        // カンマで分割し、空でない要素が1つ以上あれば良い。
        // ただし、末尾のカンマは許容される。

        // 末尾のカンマを取り除く（もしあれば）
        let processedLine = trimmedLine;
        if (processedLine.endsWith(',')) {
            processedLine = processedLine.slice(0, -1);
        }

        // 処理後の行が空でなければ、数字列が存在する
        if (processedLine.length > 0) {
            // 区切り文字で分割
            const parts = processedLine.split(',');

            // 各部分が空でなければ、それは数字列としてカウントされる
            const non_empty_parts = parts.filter(part => part.length > 0);

            if (non_empty_parts.length >= 1) {
                validCount++;
            }
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
