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
        // 妥当な形式: 1個以上の数字列がカンマで区切られている
        // これは、カンマで区切られた要素が少なくとも1つ存在し、それが数字列である必要がある。
        // ただし、仕様の解釈として、「カンマ区切りの整数列」が1つ以上存在すること。
        // 例: "1,2,3" -> 妥当
        // 例: "1," -> 妥当 (末尾のカンマは許容)
        // 例: "," -> 妥当ではない (数字列が0個)
        // 例: "abc" -> 妥当ではない (数字列ではない)

        // 行をカンマで分割する。末尾のカンマがあっても、分割された配列の最後の要素が空文字列になる可能性がある。
        // 正規表現を使って、カンマで区切られた要素がすべて整数であるかを確認する方が厳密かもしれないが、
        // 仕様は「1個以上の数字列がカンマで区切られて並んでいること」と「数字とカンマ以外を含む行は妥当ではない」に焦点を当てている。

        // まず、カンマで分割し、各要素が数字列であるか、または空文字列でないかを確認する。
        const parts = trimmedLine.split(',');

        if (parts.length === 0) {
            // これは trim() で空行を処理しているので通常到達しないはずだが念のため
            continue;
        }

        let isValid = false;
        let hasNumberSequence = false;

        for (const part of parts) {
            // 各部分が空文字列でないことを確認する。
            // 末尾のカンマが許容されるため、最後の要素が空文字列になることは許容される。
            if (part.length > 0) {
                // 数字列であるかを確認する。
                // parseIntやNumber()で変換してみて、それが有効な整数であるかを確認する。
                // ただし、仕様は「整数列」なので、文字列が数字のみで構成されているかを確認する。
                // 厳密に「整数列」をチェックする。
                if (/^\d+$/.test(part)) {
                    hasNumberSequence = true;
                } else {
                    // 数字とカンマ以外を含む行は妥当ではない
                    isValid = false;
                    break;
                }
            }
        }

        // 妥当である条件: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、空行でないこと、かつ、少なくとも1つの有効な数字列が含まれていること。
        if (hasNumberSequence) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
