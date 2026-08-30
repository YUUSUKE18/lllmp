/**
 * 標準入力からカンマ区切りの整数列が妥当であるかを判定し、結果を出力するプログラム
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("valid=0");
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

        // 妥当性の判定ロジック
        // 1. 数字とカンマ以外を含む行は妥当ではない
        // 2. 1個以上の数字列がカンマで区切られて並んでいること
        
        // 正規表現を用いて、カンマ区切りの整数列のみが構成されているかを確認する。
        // パターン: 1つ以上の数字(0-9)が続き、それがカンマで区切られている。
        // 末尾のカンマは許容される。
        // 許容されるパターン: "1,2,3", "1,2,", "1,2,3," など。
        
        // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
        // これは、行がカンマで区切られた要素（数字）のみで構成されていることを意味する。
        
        // 1. 行全体が数字とカンマのみで構成されているか確認
        // 2. カンマで区切られた後、少なくとも1つの数字列が存在するか確認。

        let isValid = false;
        
        // カンマで分割し、各要素が数値（または空文字列）であるか確認する
        const parts = trimmedLine.split(',');
        
        if (parts.length > 0) {
            // 末尾のカンマが許容されるため、最後の要素が空文字列であっても許容する。
            // 例: "1,2," -> ["1", "2", ""]
            
            // 少なくとも1つの要素が存在し、その要素が数字のみで構成されているかを確認する。
            // 厳密には、各要素が整数である必要がある。
            let allAreIntegers = true;
            for (const part of parts) {
                if (part.trim() !== "" && !/^\d+$/.test(part)) {
                    allAreIntegers = false;
                    break;
                }
            }

            if (allAreIntegers) {
                // 1個以上の数字列がカンマで区切られて並んでいる (つまり、分割された要素の総数が1以上)
                // ただし、行が " , " のようなケースでないことを確認する必要がある。
                // trimmedLine が空でないことが前提なので、parts.length >= 1 は常に真。
                // 妥当なのは、数字列が少なくとも1つ含まれていること。
                
                // 念のため、数字列が1つ以上あることを確認する。
                const numberStrings = parts.filter(p => p.trim() !== "");
                
                if (numberStrings.length >= 1) {
                    validCount++;
                }
            }
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
