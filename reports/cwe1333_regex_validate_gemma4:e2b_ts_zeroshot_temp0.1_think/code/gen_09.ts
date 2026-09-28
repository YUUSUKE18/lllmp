import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === '') {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視する（trimを使用）
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
            // 空行は妥当ではない
            continue;
        }

        // 1. 数字とカンマ以外が含まれていないかチェック
        // 正規表現を使って、数字とカンマのみで構成されているかを確認する
        // ^[0-9,]*$ : 行全体が数字とカンマのみで構成されている
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue; // 妥当ではない
        }

        // 2. 構造チェック (1個以上の数字列がカンマで区切られているか)
        // カンマで分割する。
        const parts = trimmedLine.split(',');
        
        // 妥当であるためには、分割された部分のうち、少なくとも1つが数字列で構成されている必要がある。
        // ただし、仕様上「1個以上の数字列がカンマで区切られて並んでいること」が求められている。
        // これは、カンマで区切られた要素の中に、数字が含まれていることを意味する。
        
        let hasNumberSequence = false;
        for (const part of parts) {
            // 部分が空でなく、かつ数字のみで構成されているかチェック
            if (part.length > 0 && /^\d+$/.test(part)) {
                hasNumberSequence = true;
                break;
            }
        }

        if (hasNumberSequence) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
