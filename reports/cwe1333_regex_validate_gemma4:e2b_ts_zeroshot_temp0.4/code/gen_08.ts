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
        // 正規表現で数字とカンマのみで構成されているかチェックする
        // ^[0-9,]*$ : 行が数字とカンマのみで構成されていることを確認
        // 1個以上の数字列がカンマで区切られている必要があるため、
        // 少なくとも1つの数字が含まれている必要がある。
        
        // 妥当な行の判定ロジックを再考:
        // 「1 個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマで区切られた要素が少なくとも1つ存在し、それらがすべて整数である必要がある。
        
        // 1. 行が空でないこと (既にチェック済み)
        // 2. 行が数字とカンマのみで構成されていること
        // 3. 少なくとも1つの数字列が存在すること
        
        // カンマで区切られた要素を抽出して、すべてが整数であることを確認する。
        // 妥当な形式: (数字,数字,...) または (数字,数字,...)
        
        // 処理を簡略化するため、行をカンマで分割し、各要素が整数であるか、または空でないかを確認する。
        // 仕様: 「1 個以上の数字列がカンマで区切られて並んでいること」
        // 例: "1,2,3" -> 3つの数字列
        // 例: "1,2," -> 2つの数字列 (末尾のカンマは許容)
        // 例: "," -> 0個の数字列 (妥当ではない)
        // 例: "abc" -> 妥当ではない
        
        const parts = trimmedLine.split(',');
        let hasDigits = false;
        let allValid = true;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') {
                // カンマが連続している場合 (例: "1,,2" や ",," など)
                // これは「数字列」ではないため、妥当ではないと見なすか？
                // 仕様は「1 個以上の数字列がカンマで区切られて並んでいる」なので、空の要素は許容されないと解釈する。
                // ただし、末尾のカンマは許容される。
                // "1,," の場合、parts=["1", "", ""]。空の要素は数字列ではない。
                allValid = false;
                break;
            }
            
            // 数字列であるかチェック
            if (!/^\d+$/.test(trimmedPart)) {
                // 数字とカンマ以外を含む行は妥当ではない
                allValid = false;
                break;
            }
            hasDigits = true;
        }

        if (allValid && hasDigits) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
