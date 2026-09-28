import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    let validCount = 0;

    for (const line of input) {
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        const potentialNumbers = trimmedLine.split(',');

        // 1個以上の数字列がカンマで区切られて並んでいるかを確認する
        // これは、splitの結果が空文字列を含み、かつ少なくとも1つの要素があることを意味する。
        // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当である。
        // これは、文字列がカンマで区切られた結果、少なくとも1つの非空の要素を持つことを意味する。
        
        // 厳密に「数字列」のみを扱うため、各要素が数字のみで構成されているかを確認する必要がある。
        // 仕様の解釈：「カンマで区切られて並んでいる」ことと、「数字列」の妥当性を同時に満たす必要がある。
        // 「数字とカンマ以外を含む行は妥当ではありません」という制約を考慮する。

        let isValid = true;
        let hasNumber = false;

        for (const part of potentialNumbers) {
            // 各部分が空文字列でないことを確認する (カンマが連続する場合に対応するため)
            if (part.length > 0) {
                // 数字のみで構成されているかを確認する
                if (!/^\d+$/.test(part)) {
                    isValid = false;
                    break;
                }
                hasNumber = true;
            }
        }

        // 1. 空行でないこと (trimmedLine.length > 0 で既にチェック済み)
        // 2. 数字とカンマ以外を含まないこと (上記ループでチェック)
        // 3. 1個以上の数字列がカンマで区切られて並んでいること (hasNumber が true であること)
        // 4. 末尾のカンマは許容される (splitの結果に空要素が含まれる可能性があるが、hasNumber が true であればOK)

        if (isValid && hasNumber) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
