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

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているか、または数字列が1つ以上存在するかをチェックする
        // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
        // これは、カンマで区切られた要素がすべて整数である、という条件を暗黙的に満たす必要がある。
        // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を厳密に解釈する。
        // 例: "1,2,3" -> 3つの数字列
        // 例: "1,2," -> 2つの数字列 (末尾のカンマは許容)
        // 例: "1," -> 1つの数字列
        // 例: "abc" -> 不妥当
        // 例: "1,a" -> 不妥当 (数字とカンマ以外を含む)

        // 行をカンマで分割する
        const parts = trimmedLine.split(',');

        if (parts.length === 0) {
            // これは trimmedLine が空でないのに発生しないはずだが、念のため
            continue;
        }

        let isValid = false;
        let hasNumber = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart.length > 0) {
                // 数字列であるかチェック
                if (/^\d+$/.test(trimmedPart)) {
                    hasNumber = true;
                } else {
                    // 数字とカンマ以外を含む行は妥当ではない
                    isValid = false;
                    break;
                }
            }
            // 空の要素（連続するカンマや末尾のカンマによる空文字列）は無視される（妥当な区切りとして扱われる）
        }

        if (hasNumber) {
            // 1個以上の数字列がカンマで区切られて並んでいる
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
