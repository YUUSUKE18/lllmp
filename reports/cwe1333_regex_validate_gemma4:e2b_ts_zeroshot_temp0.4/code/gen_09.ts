import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容される
        // 正規表現で、数字とカンマのみで構成されているかを確認する
        // ^\d+(,\d+)*$ : 1つ以上の数字が始まり、その後カンマと数字のペアが続くパターン
        // ^\d*,\d*$ : 末尾にカンマがある場合も許容する
        
        // 妥当な行の判定ロジック:
        // 1. 数字とカンマのみで構成されていること。
        // 2. 少なくとも1つの数字が含まれていること。
        
        // 厳密なルールに従うため、行全体を解析する
        
        let isValid = false;
        
        // 1. 行が空でないことを確認済み
        
        // 2. 数字とカンマ以外を含まないか確認
        let containsOnlyDigitsAndCommas = true;
        for (const char of trimmedLine) {
            if (!/\d|-/.test(char)) {
                containsOnlyDigitsAndCommas = false;
                break;
            }
        }

        if (!containsOnlyDigitsAndCommas) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 3. 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた要素がすべて整数である、という条件を満たせば良い。
        // 妥当とは「1個以上の数字列がカンマで区切られて並んでいること」
        
        // 末尾のカンマは許容される。
        // 例: "1,2,3" -> 妥当
        // 例: "1,2," -> 妥当
        // 例: "123" -> 妥当 (カンマなしでも1つの数字列なので)
        // 例: "," -> 妥当ではない (数字列が0個)
        // 例: "" -> 空行として除外済み
        
        // 妥当な行の定義を再解釈:
        // 「1 個以上の数字列がカンマで区切られて並んでいる」
        // これは、カンマで区切られた要素が少なくとも1つ存在することを意味する。
        
        // カンマで分割して、空でない要素が1つ以上あるかを確認する。
        const parts = trimmedLine.split(',');
        
        // 末尾のカンマが許容されるため、末尾の空文字列は無視する。
        // 例: "1,2," -> ["1", "2", ""]
        // 例: "123" -> ["123"]
        
        // 妥当なのは、分割された要素の中に、少なくとも1つの数字列（空でない文字列）が含まれている場合。
        const non_empty_parts = parts.filter(p => p.length > 0);
        
        if (non_empty_parts.length > 0) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
