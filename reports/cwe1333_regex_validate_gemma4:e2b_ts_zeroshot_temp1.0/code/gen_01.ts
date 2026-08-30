/**
 * 標準入力から行を読み込み、カンマ区切りの整数列として妥当かどうかを判定し、結果を出力する。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    let validCount = 0;

    for (const line of input) {
        // 行の前後の空白を無視して処理
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 妥当な行の判定ロジック
        // 妥当とは「1個以上の数字列がカンマで区切られて並んでいること」
        // また、「数字とカンマ以外を含む行は妥当ではない」
        
        // 1. 数字とカンマのみで構成されているかチェック
        // 正規表現で数字 (0-9) とカンマ (,) のみで構成されているか確認する
        const validCharsOnly = /^[0-9,]*$/.test(trimmedLine);

        if (!validCharsOnly) {
            // 数字とカンマ以外を含む行は妥当ではない
            continue;
        }

        // 2. 1個以上の数字列がカンマで区切られているかチェック
        // 末尾のカンマは許容する。
        
        // 行全体をカンマで分割する。
        // 末尾のカンマがあっても、空文字列が含まれる可能性がある。
        const parts = trimmedLine.split(',');
        
        // 妥当であるためには、少なくとも1つの要素（数字列）が存在する必要がある。
        // ただし、空行でないことが保証されているため、partsには少なくとも1つの要素が入る。
        // 例: "1,2,3" -> ["1", "2", "3"] (長さ3)
        // 例: "1," -> ["1", ""] (長さ2)
        // 例: "," -> ["", ""] (長さ2) -- これは「数字とカンマ以外を含む」チェックで除外されるべきだが、念のため
        
        // 妥当の定義を再確認: 「1 個以上の数字列がカンマで区切られて並んでいること」
        // 数字列が空文字列であってはならない。
        
        let hasValidNumberSequence = false;
        for (const part of parts) {
            // 各部分が数字のみで構成されているか確認
            if (part.length > 0 && /^\d+$/.test(part)) {
                hasValidNumberSequence = true;
                break;
            }
        }

        // 念のため、split後の要素数と内容で判定する。
        // 行が数字とカンマのみで構成されている場合、最低1つの数字列が存在するか？
        // 例: "1" -> ["1"]. 有効。
        // 例: "," -> ["", ""]. 数字列は存在しない。無効。
        // 例: "1," -> ["1", ""]. "1" は数字列。有効。
        
        if (hasValidNumberSequence) {
            validCount++;
        }
    }

    // 結果の出力
    console.log(`valid=${validCount}`);
}

solve();
