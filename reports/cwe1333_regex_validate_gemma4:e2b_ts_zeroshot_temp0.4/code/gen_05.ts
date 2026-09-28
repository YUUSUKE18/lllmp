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

        // 末尾のカンマは許容する
        // 正規表現で、数字とカンマのみで構成されているかを確認する
        // ^ - 行の先頭
        // [0-9,]* - 0から9、またはカンマが0回以上続く
        // $ - 行の末尾
        // この正規表現だけでは「1個以上の数字列がカンマで区切られている」ことを保証できないため、
        // 実際に分割してチェックする方が仕様に忠実である。

        // 妥当性の判定ロジック:
        // 1. 数字とカンマ以外を含まないこと。
        // 2. 1個以上の数字列がカンマで区切られていること。

        // 行をカンマで分割する
        const parts = trimmedLine.split(',');

        if (parts.length === 0) {
            // これは既にtrim()で空行で除外されているはずだが念のため
            continue;
        }

        let isValid = false;
        let hasNumber = false;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart === '') {
                // カンマが連続している場合 (例: "1,,2") や、末尾のカンマ後の空文字列
                continue;
            }
            
            // 数字列であるかチェック
            if (/^\d+$/.test(trimmedPart)) {
                hasNumber = true;
            } else {
                // 数字とカンマ以外を含む行は妥当ではない
                isValid = false;
                break;
            }
        }

        // 1個以上の数字列がカンマで区切られて並んでいること
        // これは、空の要素が一つ以上存在し、かつ数字が含まれている必要がある。
        // 例: "1,2" -> ["1", "2"] (長さ2)
        // 例: "1," -> ["1", ""] (長さ2)
        // 例: "," -> ["", ""] (長さ2) -> hasNumber=false
        
        // 妥当な行の条件:
        // 1. 数字とカンマ以外を含まない (上記ループで確認済み)
        // 2. 少なくとも1つの数字列が存在する (hasNumberがtrue)
        // 3. 区切り文字（カンマ）が存在し、複数の要素がある（ただし、末尾のカンマは許容される）

        // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定する。
        // これは、分割後の要素のうち、空でない要素が1つ以上存在し、それらが数字で構成されていることを意味する。
        
        // 処理を簡略化し、行が数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれているかをチェックする。
        
        // 1. 数字とカンマのみで構成されているか (trim()でチェックした部分が全て数字かカンマのみ)
        let isNumericAndCommaOnly = true;
        for (const char of trimmedLine) {
            if (!/^[0-9,]*$/.test(char)) {
                isNumericAndCommaOnly = false;
                break;
            }
        }

        if (!isNumericAndCommaOnly) {
            continue; // 数字とカンマ以外を含む行はスキップ
        }

        // 2. 1個以上の数字列がカンマで区切られているか
        // 以下の条件で妥当と見なす:
        // a) 少なくとも1つの数字が含まれている (hasNumberがtrue)
        // b) カンマが存在するか、または末尾のカンマが許容される構造である。
        
        // 少なくとも1つの数字が含まれていることを確認する（hasNumberがtrue）
        if (hasNumber) {
            // 以下のケースは妥当と見なす
            // "1,2" -> true
            // "1," -> true (末尾のカンマは許容)
            // "," -> false (hasNumberがfalseになるため除外)
            // "1,,2" -> true (要素は["1", "", "2"]。数字列が2つある)
            
            // hasNumberがtrueであれば、少なくとも1つの数字列が存在しているため、
            // その行は「1個以上の数字列がカンマで区切られて並んでいる」と解釈する。
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
