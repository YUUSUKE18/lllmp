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

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているか、または数字列が1つ以上存在するかをチェックする
        // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた要素がすべて整数である、という条件を暗黙的に満たす必要がある。
        // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を厳密に解釈する。
        // 例: "1,2,3" -> 3つの数字列
        // 例: "1,2," -> 2つの数字列 (末尾のカンマは許容)
        // 例: "1," -> 1つの数字列
        // 例: "abc,1" -> 不妥当 (数字とカンマ以外を含む)

        // 1. 数字とカンマ以外を含む行は妥当ではない
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue;
        }

        // 2. 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいるか
        // カンマで分割し、空でない要素が1つ以上あれば妥当とする。
        // 末尾のカンマがあっても、split(',')の結果は空文字列を含む可能性がある。
        
        // 末尾のカンマを削除して処理を簡略化する（ただし、末尾のカンマは許容されるため、そのまま分割する方が安全）
        
        // 例: "1,2,3" -> ["1", "2", "3"] (長さ3)
        // 例: "1,2," -> ["1", "2", ""] (長さ3)
        // 例: "," -> ["", ""] (長さ2) -> これは不妥当（空の数字列ではない）
        // 例: "" (既に除外済み)

        const parts = trimmedLine.split(',');
        
        // 妥当な行の条件: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、分割された要素の中に、少なくとも1つ以上の非空の文字列（数字列）が存在すれば良い、と解釈する。
        // ただし、"1," の場合、parts=["1", ""]。非空要素は1つ。
        // "," の場合、parts=["", ""]。非空要素は0。これは不妥当。
        
        let hasValidNumberSequence = false;
        for (const part of parts) {
            if (part.length > 0) {
                // 数字列として妥当（ここでは数字のみで構成されていることが、前のチェックで保証されている）
                hasValidNumberSequence = true;
                break;
            }
        }

        if (hasValidNumberSequence) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
