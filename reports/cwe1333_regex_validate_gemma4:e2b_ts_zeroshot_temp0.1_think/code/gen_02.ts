import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("valid=0");
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視する（trim）
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            // 空行は妥当ではない
            continue;
        }

        // 妥当性の判定ロジック
        // 1. 数字とカンマ以外が含まれていないかチェック
        // 正規表現: 数字(0-9)とカンマ(,)のみで構成されているか
        const validCharsRegex = /^[0-9,]*$/;
        if (!validCharsRegex.test(trimmedLine)) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 2. 1個以上の数字列がカンマで区切られているかチェック
        // カンマで分割し、空でない要素が1つ以上あるかを確認する
        const parts = trimmedLine.split(',');
        
        // 空でない要素（数字列）が1つ以上存在するかどうか
        const hasNumberSequences = parts.some(part => part.length > 0);

        if (hasNumberSequences) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
