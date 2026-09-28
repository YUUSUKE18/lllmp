import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    let validCount = 0;

    for (const line of input) {
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマを許容するため、行全体をチェックする
        // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
        // これは、カンマで区切られた要素が少なくとも1つ存在し、
        // その間に数字列が存在することを意味します。

        // 1. 行が空でないことを確認済み。
        // 2. 数字とカンマ以外を含む行は妥当ではない。
        let isValid = true;
        let hasNumber = false;
        let lastCharWasNumber = false;

        for (let i = 0; i < trimmedLine.length; i++) {
            const char = trimmedLine[i];

            if (char >= '0' && char <= '9') {
                hasNumber = true;
                lastCharWasNumber = true;
            } else if (char === ',') {
                // カンマは許容される
            } else {
                // 数字とカンマ以外が含まれた場合
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            continue;
        }

        // 妥当性の判定: 1個以上の数字列がカンマで区切られているか
        // これは、カンマが存在するか、または数字列が存在することを意味します。
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。」

        // 例: "1,2,3" -> 妥当 (3つの数字列)
        // 例: "1," -> 妥当 (1つの数字列とカンマ)
        // 例: "," -> 不妥当 (数字列がない)
        // 例: "abc" -> 不妥当 (数字とカンマ以外)

        let hasValidNumberSequence = false;
        let inNumberSequence = false;

        for (const char of trimmedLine) {
            if (char >= '0' && char <= '9') {
                inNumberSequence = true;
                hasValidNumberSequence = true;
            } else if (char === ',') {
                // カンマは区切りとして許容される
            } else {
                // 数字とカンマ以外は不妥当
                isValid = false;
                break;
            }
        }

        if (isValid && hasValidNumberSequence) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
