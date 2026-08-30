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
        // 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマで区切られた要素が少なくとも1つ存在し、かつ、
        // その区切りが数字列のみで構成されていることを意味する。

        // 1. 末尾のカンマを削除してチェックする
        let content = trimmedLine;
        if (content.endsWith(',')) {
            content = content.slice(0, -1);
        }

        // 2. カンマで分割して、各要素が数字列のみで構成されているかチェックする
        const parts = content.split(',');
        let isValid = true;

        if (parts.length === 0) {
            // これは、元の行がカンマのみ（例: "," や " , "）だった場合、
            // または、空行として処理された場合（既に空行チェックで除外済み）
            // ただし、元の行が "1,2," のような形式であれば parts は ["1", "2"] となる。
            // 妥当性の定義：「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、カンマで区切られた要素がすべて数字列である必要がある。
            // 空行チェックを通過した行について、partsが空でないことを確認する。
            // もし元の行が "1,," のように空の要素を含む場合、それは妥当ではないと解釈する。
            // 仕様：「数字とカンマ以外を含む行は妥当ではありません。」
            // これは、各要素が数字のみで構成されていることを意味する。
            
            // parts.length === 0 は、content が空文字列だった場合（trimmedLineが空でないため、これは起こらないはず）
            // contentがカンマのみの場合 (例: "," または " ,")
            if (content.length > 0 && parts.every(p => p.length === 0)) {
                 // これは、contentがカンマのみで構成されている場合（例: ","）に発生する可能性がある。
                 // この場合、妥当ではないと判断する。
                 isValid = false;
            }
        } else {
            for (const part of parts) {
                // 各部分が空でないこと、および数字のみで構成されていることを確認
                if (part.length === 0 || !/^\d+$/.test(part)) {
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
