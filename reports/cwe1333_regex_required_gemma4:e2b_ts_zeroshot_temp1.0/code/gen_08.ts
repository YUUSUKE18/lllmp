import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];

    rl.on('line', (line) => {
        lines.push(line);
    });

    rl.on('close', () => {
        const validLines: number[] = [];
        
        // 正規表現パターン:
        // ^\s* : 行の先頭の空白を無視
        // (?:[0-9,]+) : 1個以上の数字とカンマの組み合わせが1回以上続くこと (非キャプチャグループ)
        // .*? : 任意の文字（カンマや数字など）を非貪欲にマッチ
        // $ : 行の終わり
        // このパターンは、行が完全に数字とカンマ（および空白）のみで構成されていることをチェックします。
        // さらに、この行が空行でないことを確認する必要があります。
        const validLineRegex = /^\s*(?:[0-9,]+.*)$/;

        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // 1. 空行チェック (空行は妥当ではない)
            if (trimmedLine.length === 0) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行のチェック (正規表現でチェック)
            // 仕様では「数字とカンマ以外を含む行は妥当ではない」とあるため、
            // 行全体が数字とカンマで構成されていることを確認します。
            // ただし、カンマ区切り列が「1個以上」あることを許容します。

            // 正規表現の再検討:
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」ことです。
            // 例: "1,2,3" (妥当), "1,2," (妥当), "1,," (妥当だが、数字列が空になる可能性はあるか？ 仕様からは不明確だが、"1個以上の数字列"が鍵)
            // 空白無視は行レベルで行う。

            // 行が数字とカンマのみで構成されていることを確認します。
            // この行が完全に数字とカンマ（および空白）のみで構成されているかチェックします。
            // ただし、"1,a"のようなケースはNG。
            
            // 厳密に「数字とカンマ以外を含む行は妥当ではない」を適用します。
            // これは、行に含まれる文字が数字、カンマ、空白のみであることを意味します。
            const allowedCharsRegex = /^[0-9, \t\r\n]*$/;

            if (!allowedCharsRegex.test(line)) {
                // 数字とカンマ以外を含む行は妥当ではない
                continue;
            }

            // 3. 1個以上の数字列がカンマで区切られているか (妥当性の判定)
            // カンマで区切られていて、少なくとも一つの数字列が存在する必要があります。
            // 例: "1,2,3" -> 3つの数字列
            // 例: "," -> 2つの数字列 (空文字列と空文字列)
            // 例: "" (空行) -> 0個の数字列 (スキップ済み)

            // カンマで分割し、空でない要素が少なくとも1つ存在するかをチェックする。
            const parts = line.split(',');
            let hasValidNumbers = false;
            for (const part of parts) {
                // trim()して空文字列でない数字列が存在するか確認
                if (part.trim().length > 0) {
                    hasValidNumbers = true;
                    break;
                }
            }

            if (hasValidNumbers) {
                validLines.push(1);
            }
        }

        console.log(`valid=${validLines.length}`);
    });
}

solve();
