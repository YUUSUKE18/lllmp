/**
 * 標準入力から各行を読み込み、カンマ区切りの整数列として妥当かどうかを判定する。
 * 妥当とは、1個以上の数字列がカンマで区切られて並んでいることである。
 *
 * @author Code Generator
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    let validCount = 0;

    for (const line of input) {
        // 行の前後の空白を無視して処理
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマを許容するため、トリムせずに判定する
        // ただし、数字とカンマ以外を含む行は妥当ではないという条件がある。
        // 妥当な形式は「1個以上の数字列がカンマで区切られて並んでいる」
        
        // 行が完全に空でなければ、数字とカンマのみで構成されているかを確認する
        let isValid = false;
        
        // 行をカンマで分割する
        // 末尾のカンマがあっても、split(',')は配列を返す
        const parts = trimmedLine.split(',');
        
        // 妥当であるための条件：
        // 1. 分割された要素の中に、少なくとも1つ以上の非空の文字列（数字列）が含まれていること。
        // 2. 行全体が数字とカンマのみで構成されていること。（仕様：空行、および数字とカンマ以外を含む行は妥当ではない）

        if (parts.length > 0) {
            // 1. 少なくとも1つの要素が存在する場合
            let containsNumber = false;
            for (const part of parts) {
                if (part.trim().length > 0) {
                    // 要素が空でなく、それが数字列であるかを確認する
                    // ここでは、要素が全て整数であることを厳密にチェックする必要がある。
                    // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を優先する。
                    
                    // 各部分が数字列（カンマで区切られたもの）であることを確認する
                    // 単純化のため、各部分が数字のみで構成されているか確認する
                    if (/^\d+$/.test(part.trim())) {
                        containsNumber = true;
                    } else {
                        // 数字とカンマ以外を含む行は妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }

            if (containsNumber) {
                 // 少なくとも1つの数字列が存在すれば妥当
                 isValid = true;
            }
            
            // 最終的な妥当性の確認：
            // 空行は除外済み。
            // 数字とカンマ以外を含む行は上記のループで false になっているはず。
            // 1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容されるため、末尾がカンマで終わる場合もOK。
            
            // 念のため、全体の文字列が数字とカンマのみで構成されていることを再確認する。
            const allCharsValid = [...trimmedLine].every(char => /[\d,]/).length > 0 && 
                                 !/[^0-9, ]/.test(trimmedLine); // 数字、カンマ、スペースのみ許可、ただし空行は除外

            if (isValid && allCharsValid) {
                validCount++;
            } else {
                // isValidがfalseの場合、またはallCharsValidがfalseの場合
                // 妥当ではない
            }
        }
    }

    // 最終的な出力
    console.log(`valid=${validCount}`);
}

solve();
