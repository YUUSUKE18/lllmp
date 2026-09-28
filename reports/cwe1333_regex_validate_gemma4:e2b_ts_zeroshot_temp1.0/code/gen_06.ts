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
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容されるため、トリムしてカンマで分割する
        // ただし、行全体が数字とカンマのみで構成されているかを確認する必要がある
        
        // 行全体が「数字とカンマのみ」で構成されているかを確認する
        const isValidFormat = /^[0-9,]*$/.test(trimmedLine);
        if (!isValidFormat) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 妥当性の判定：1個以上の数字列がカンマで区切られて並んでいること
        // 末尾のカンマは許容される。
        
        // 行全体をカンマで分割してみる
        const parts = trimmedLine.split(',');
        
        // 妥当な条件：
        // 1. 少なくとも1つの要素（数字列）が存在する。
        // 2. 少なくとも1つの要素が空文字列でなく、かつ数字列として妥当である（この問題の文脈では、空文字列は区切りとして扱われる）。
        
        // 末尾のカンマが許容されるため、splitの結果、末尾に空文字列が含まれる可能性がある。
        // 例: "1,2,3," -> ["1", "2", "3", ""]
        
        // 妥当なのは、分割された部分のうち、数字列として意味のあるものが1つ以上存在する場合。
        // または、splitの結果、要素の数が1以上で、その中で数字列が構成されている場合。

        // 最も簡単な解釈: 区切り文字で分割された結果、少なくとも1つの要素が存在すれば妥当。
        // ただし、もし行が " , " のようにカンマだけなら、空の要素が多すぎる。
        // 「1 個以上の数字列がカンマで区切られて並んでいる」
        
        // カンマで区切られた要素をフィルタリングし、数字列のみを対象とする
        const numericParts = parts.filter(p => p.length > 0);

        if (numericParts.length >= 1) {
            // 空行でないこと、数字とカンマ以外を含まないこと、そして1つ以上の数字列が存在すること。
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
