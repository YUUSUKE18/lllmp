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
        // 行の前後の空白を無視する
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているか、または数字とカンマで終わるかをチェックする
        // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた要素がすべて整数である、という条件を満たす必要がある。
        // 妥当な行は、カンマで区切られた要素がすべて整数である、という条件を満たす。
        // 「1 個以上の数字列がカンマで区切られて並んでいる」
        // これは、カンマで区切られた文字列を分割した結果、すべてが空でない（数字列）ことを意味する。

        // 1. 末尾のカンマを削除してチェックする
        let content = trimmedLine;
        if (content.endsWith(',')) {
            content = content.slice(0, -1);
        }

        // 2. カンマで分割する
        const parts = content.split(',');

        // 3. 妥当性の判定
        // 妥当であるためには、少なくとも1つの数字列が存在し、それらがカンマで区切られている必要がある。
        // 空行は既に除外されている。
        // 妥当な行は、カンマで区切られた要素がすべて整数である、という条件を満たす。
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。」
        // 「空行、および数字とカンマ以外を含む行は妥当ではありません。」

        // 数字とカンマ以外を含む行のチェック:
        // partsの各要素が、数字のみ（または数字とカンマの組み合わせ）で構成されているかを確認する。
        // ここでは、各要素が空でないことを確認し、その要素が整数であるかを確認する。

        let isValid = true;
        if (parts.length === 0) {
            // これはtrimmedLineが空でないのにsplitで空の配列になることはないはずだが、念のため
            isValid = false;
        } else {
            // 各部分が空でないことを確認する（カンマが連続している場合など）
            if (parts.some(p => p.trim() === '')) {
                isValid = false;
            } else {
                // 各部分が整数であるかを確認する
                for (const part of parts) {
                    // 数字とカンマ以外を含む行は妥当ではない、という制約を考慮する。
                    // ここでは、各部分が整数であるかを確認する。
                    if (!/^-?\d+$/.test(part)) {
                        isValid = false;
                        break;
                    }
                }
            }
        }

        // 最終的な妥当性の再評価：
        // 「1 個以上の数字列がカンマで区切られて並んでいる」
        // これは、カンマで区切られた要素がすべて整数である、という条件を満たすことを意味する。
        // 空行は除外済み。
        // 数字とカンマ以外を含む行は除外済み。

        // 妥当な行の判定をシンプルにする。
        // 1. 空行でないこと (trimmedLine !== '')
        // 2. カンマで分割した結果、すべてが整数であること。
        // 3. 少なくとも1つの要素があること (parts.length > 0)

        let finalIsValid = false;
        if (trimmedLine !== '') {
            // 末尾のカンマを考慮して分割
            const rawParts = trimmedLine.split(',');

            // 妥当な行は、カンマで区切られた要素がすべて整数であること。
            // 末尾のカンマは許容される。
            // 例: "1,2," -> parts = ["1", "2", ""]
            // この場合、最後の空文字列は許容される（末尾のカンマによる）。

            // 妥当な行の定義を再解釈:
            // 1. 1個以上の数字列がカンマで区切られている。
            // 2. 数字とカンマ以外を含まない。

            // 最後の要素が空文字列であることは、末尾のカンマが許容されるため、許容される。
            // 例: "1,2," -> parts = ["1", "2", ""]。要素数は3。1と2は数字列。
            // 1個以上の数字列が存在すればOK。

            let allPartsAreIntegers = true;
            for (const part of rawParts) {
                // 空文字列は末尾のカンマによるもので許容される。
                if (part.length > 0) {
                    if (!/^-?\d+$/.test(part)) {
                        allPartsAreIntegers = false;
                        break;
                    }
                }
            }

            if (allPartsAreIntegers) {
                // 少なくとも1つの数字列が存在すれば良い。
                // 空行でないため、parts.length >= 1。
                // 1個以上の数字列が区切られている、という条件は、
                // 少なくとも1つの非空の数字列が存在すれば満たされる。
                const non_empty_parts = rawParts.filter(p => p.length > 0);
                if (non_empty_parts.length > 0) {
                    validCount++;
                }
            }
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
