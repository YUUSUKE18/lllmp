import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("valid=0");
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視して処理
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 妥当性のチェック
        // 1. 数字とカンマ以外を含む行は不適
        // 2. 1個以上の数字列がカンマで区切られて並んでいること
        
        // 正規表現でチェック: 数字とカンマのみで構成されているか
        // ^[\d,]*$ は、行が数字とカンマのみで構成されていることを意味する
        if (!/^[\d,]*$/.test(trimmedLine)) {
            continue; // 数字とカンマ以外を含む行は不適
        }

        // 区切り文字のチェック
        // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマが存在し、かつ数字列が存在することを意味する。
        
        // 末尾のカンマは許容される。
        
        // 1. カンマが含まれているか？
        if (trimmedLine.includes(',')) {
            // カンマが含まれている場合、数字列が少なくとも2つ以上あるか、または1つの数字列にカンマが含まれているか。
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
            // 例: "1,2" (2つの列) -> 妥当
            // 例: "1" (1つの列) -> 妥当 (区切りがない場合は、1つの列とみなせる)
            // 例: "," (空の列) は許容されない。
            
            // 妥当性の厳密な解釈：数字の塊がカンマで区切られている。
            // 連続するカンマや、カンマのみの行は不適。
            
            // カンマを基準に分割し、空でない要素が1つ以上あれば妥当とする。
            const parts = trimmedLine.split(',');
            let actualNumberSequences = 0;
            for (const part of parts) {
                if (part.trim() !== "") {
                    actualNumberSequences++;
                }
            }
            
            if (actualNumberSequences >= 1) {
                validCount++;
            }
        } else {
            // カンマが含まれていない場合（例: "123"）、これは1つの数字列とみなせるため妥当。
            // "123" は「1個の数字列」として妥当。
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
