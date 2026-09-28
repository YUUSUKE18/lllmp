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

        // 末尾のカンマがあっても許容する
        // 正規表現で、数字とカンマのみで構成されているか、かつ少なくとも1つの数字が含まれているかをチェックする
        // ^\s* 表示行の先頭から
        // (?:[0-9]+(?:,[0-9]+)*)  少なくとも1つの数字列がカンマで区切られているパターン
        // (?:,)?                 オプションで末尾にカンマがある
        // \s*$                  行の末尾まで
        const regex = /^(?:[0-9]+(?:,[0-9]+)*)(?:,)?\s*$/;

        // 厳密な仕様の解釈：
        // 1. 1 個以上の数字列がカンマで区切られて並んでいること。
        // 2. 空行、および数字とカンマ以外を含む行は妥当ではない。
        // 3. 末尾のカンマは許容する。

        // 数字とカンマのみで構成されているかを確認する
        if (/^[0-9,]*$/.test(trimmedLine)) {
            // 少なくとも1つの数字が含まれているかを確認する
            if (/[0-9]/.test(trimmedLine)) {
                // 数字とカンマのみで構成され、少なくとも1つの数字が含まれている場合、妥当とみなす。
                // 末尾のカンマは許容されるため、この条件で十分。
                validCount++;
            }
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
