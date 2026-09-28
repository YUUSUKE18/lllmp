import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視する（trim()で対応）
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた要素が少なくとも1つ存在し、
        // その要素がすべて整数であることを意味する。
        // 各要素が数字（整数）であり、カンマで区切られている必要がある。

        // 1. 末尾のカンマは許容される
        let content = trimmedLine;
        if (content.endsWith(',')) {
            content = content.substring(0, content.length - 1);
        }

        // 2. 少なくとも1個の要素（数字列）が存在し、それらがカンマで区切られているか確認する。
        // 空文字列でないことを確認する
        if (content.length === 0) {
            // 元が「,」や「, ,」のようなケースだった場合。
            // 末尾のカンマ除去後に空になるのは、元が空行やカンマのみの場合を意味するため、
            // その行全体が妥当でないという判断に基づき、ここでは妥当としない。
            continue;
        }

        // カンマで分割して、全てが整数であることを確認する。
        const parts = content.split(',');
        let allAreIntegers = true;

        for (const part of parts) {
            // 各部分を試行的に整数に変換する（NaNチェックを含む）
            if (!/^\d+$/.test(part)) {
                allAreIntegers = false;
                break;
            }
        }

        if (allAreIntegers) {
            // 数字とカンマ以外を含む行ではない、という条件は、
            // 上記の正規表現チェック（/^\d+$/）が満たされれば、
            // その行が「カンマ区切りの整数列」として妥当であると見なす。
            // 例: "1,2,3" -> parts=["1", "2", "3"]。全て数字。妥当。
            // 例: "1,2," -> content="1,2"。parts=["1", "2"]。全て数字。妥当。
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
