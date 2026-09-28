/**
 * 標準入力から一行ずつ読み込み、カンマ区切りの整数列として妥当かどうかを判定し、
 * 妥当な行数をカウントして出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視する（trim()で処理）
        const trimmedLine = line.trim();

        // 1. 空行の判定
        if (trimmedLine.length === 0) {
            continue; // 空行は妥当ではない
        }

        // 2. 数字とカンマ以外を含む行の判定
        // 正規表現で、数字、カンマ、およびそれ以外が含まれていないかチェックする
        // 妥当な形式: 1個以上の数字とカンマのみ
        // これは、行が完全にカンマと数字のみで構成されている必要があることを意味する。
        const regex = /^[\d,]*$/;
        if (!regex.test(trimmedLine)) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 3. 妥当性の判定（1個以上の数字列がカンマで区切られているか）
        // 末尾のカンマは許容される。
        // 妥当なのは、「1個以上の数字列がカンマで区切られて並んでいる」こと。
        // これは、文字列が空でないこと、そして数字とカンマだけで構成されていることが前提。
        
        // 末尾のカンマを削除した後の文字列を考え、その中に数字が存在するかどうかで判定する。
        // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」であるため、
        // 少なくとも1つの数字が含まれていれば妥当と見なす。

        // カンマで分割してみる
        const parts = trimmedLine.split(',');

        // 末尾のカンマがあっても、splitの結果は空文字列や数字の配列になる。
        // 例: "1,2,3," -> ["1", "2", "3", ""]
        // 例: "1," -> ["1", ""]
        // 例: "," -> ["", ""] (これは数字列ではないため不適)

        let hasDigits = false;
        for (const part of parts) {
            // 各部分が数字（カンマ区切りなので、カンマで区切られた部分が数字列）であるかチェック
            if (part.trim().length > 0 && /^\d+$/.test(part.trim())) {
                hasDigits = true;
            }
        }

        // 1個以上の数字列が存在すれば妥当
        if (hasDigits) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
