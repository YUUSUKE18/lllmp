import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');
    let validCount = 0;

    for (const line of input) {
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマが許容されるため、トリムした後にカンマで分割してチェックする
        // ただし、行全体が数字とカンマだけで構成されている必要がある
        
        // 1. 数字とカンマ以外を含む行は妥当ではない
        if (!/^[0-9,]*$/.test(line)) {
            continue;
        }
        
        // 2. 1個以上の数字列がカンマで区切られているかチェックする
        // 正規表現でカンマで区切られた数字の列の存在をチェックする。
        // これは、カンマで区切られた要素が存在し、それらがすべて数字である、という条件を満たす必要がある。
        
        // カンマで分割し、各要素が空でなければ（つまり、数字の列が1個以上あれば）妥当と見なす。
        const parts = line.split(',');
        
        // 末尾のカンマが許容されるため、最後の要素が空かどうかを判定する必要がある。
        // 例: "1,2,3" -> ["1", "2", "3"] (3個)
        // 例: "1,2," -> ["1", "2", ""] (3個)
        // 例: "," -> ["", ""] (2個)
        // 例: "" (空行でスキップ済み)
        
        // 妥当であるためには、「1個以上の数字列がカンマで区切られて並んでいる」必要がある。
        // これは、区切り文字（カンマ）が存在し、少なくとも1つの非空の数字列が存在することを意味する。
        
        let hasValidNumberColumn = false;
        for (const part of parts) {
            if (part.trim() !== '') {
                // 数字列が存在すればOK
                hasValidNumberColumn = true;
            }
        }

        if (hasValidNumberColumn) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
