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

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 行が数字とカンマのみで構成されているかチェック
        // 正規表現を使って、数字とカンマのみで構成されているかを確認する
        // \d+ は1つ以上の数字、, はカンマ
        // 末尾のカンマは許容されるため、行全体がこのパターンに一致するか確認する
        
        // 妥当な行の判定条件:
        // 1. 空行ではない
        // 2. 数字とカンマ以外を含まない
        // 3. 1個以上の数字列がカンマで区切られている（末尾のカンマは許容）
        
        // 行をカンマで分割し、各要素が整数であるか確認する
        const parts = trimmedLine.split(',');
        
        if (parts.length === 0) {
            // これは trimmedLine === "" の場合に発生するが、既にチェック済み
            continue;
        }

        let isValid = true;
        
        // 各部分が整数であるか、または空文字列（末尾カンマによる）であることを確認する
        for (const part of parts) {
            if (part.length > 0) {
                // 空でない部分が整数であるか確認
                if (!/^\d+$/.test(part)) {
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            // 妥当な行の条件: 1個以上の数字列がカンマで区切られている。
            // これは、数字列が1つ以上存在し、カンマ区切りである、という条件を満たす。
            // 空行でなかった場合、少なくとも1つの要素（数字列または空文字列）が存在する。
            // ただし、「1個以上の数字列がカンマで区切られて並んでいる」という定義を満たす必要がある。
            // 例えば "1,2," は妥当。 "1," は妥当。
            // 唯一妥当でないのは「数字とカンマ以外を含む行」と「空行」のみ。
            
            // 空行でない、数字とカンマ以外を含まない、という条件が満たされれば、
            // 1個以上の数字列がカンマで区切られているとみなす。（末尾のカンマも許容）
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
