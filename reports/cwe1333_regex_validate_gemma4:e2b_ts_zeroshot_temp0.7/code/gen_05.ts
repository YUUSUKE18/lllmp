/**
 * 標準入力から一行ずつ読み込み、カンマ区切りの整数列として妥当かどうかを判定し、
 * 妥当な行数を数えて出力する。
 */
function solve() {
    const fs = require('fs');
    
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (!input) {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視して処理する
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 末尾のカンマは許容する
        // 正規表現で判定する: 
        // ^ - 行の先頭
        // [0-9]+(?:,[0-9]+)* - 1つ以上の数字が始まり、カンマと数字の繰り返しが続くパターン
        // $ - 行の末尾
        // もしくは、数字とカンマのみで構成されているか、または数字列が1つ以上存在するかをチェックする。

        // 妥当な行の条件: 
        // 1. 数字とカンマのみで構成されていること (空行以外)
        // 2. 少なくとも1つの数字列が存在すること (カンマで区切られた整数列)
        
        // 1. 数字とカンマ以外の文字が含まれていないかチェック
        // 正規表現: 0-9と,のみで構成されているか
        const containsOnlyDigitsAndCommas = /^[0-9,]*$/.test(trimmedLine);
        if (!containsOnlyDigitsAndCommas) {
            continue; // 数字とカンマ以外の文字が含まれていれば妥当ではない
        }

        // 2. 少なくとも1つの数字列が存在するかチェック
        // カンマで区切られた整数列が1つ以上存在すること。
        // 以下の条件で、空文字列やカンマのみの行を除外する。
        
        // 末尾のカンマを削除して、残ったものが空でないかチェックする
        const contentWithoutTrailingComma = trimmedLine.endsWith(',') ? trimmedLine.slice(0, -1) : trimmedLine;

        if (contentWithoutTrailingComma.length === 0) {
            // カンマのみの行 (例: "," または ",," など) は妥当ではない
            continue;
        }

        // 1つ以上の数字列が存在する場合、妥当である
        // trim() してから、カンマで分割し、要素のいずれかが数字であるか確認する。
        const parts = contentWithoutTrailingComma.split(',');
        let hasNumbers = false;
        for (const part of parts) {
            if (part.length > 0 && /^\d+$/.test(part)) {
                hasNumbers = true;
                break;
            }
        }

        if (hasNumbers) {
            validCount++;
        }
    }

    console.log(`valid=${validCount}`);
}

solve();
