import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input.length === 0) {
        console.log('valid=0');
        return;
    }

    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 行の前後の空白を無視する
        const trimmedLine = line.trim();

        // 1. 空行は妥当ではない
        if (trimmedLine.length === 0) {
            continue;
        }

        // 2. カンマで分割する
        const parts = trimmedLine.split(',');
        
        let isValid = false;

        // 3. 1個以上の数字列がカンマで区切られて並んでいるか判定する
        for (const part of parts) {
            // 部分が空でなく、かつその部分がすべて数字であるかを確認する
            if (part.length > 0 && /^\d+$/.test(part)) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
