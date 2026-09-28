import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === '') {
        console.log('valid=0');
        return;
    }

    // 行ごとに分割する
    const lines = input.split('\n');
    let validCount = 0;

    // 妥当性の判定に使用する正規表現
    // ^[\d,]+$ : 行全体が1文字以上の数字またはカンマのみで構成されていることを確認する。
    // これにより、空行や数字・カンマ以外の文字を含む行を排除する。
    const validationRegex = /^[\d,]+$/;

    for (const line of lines) {
        // 行の前後の空白を無視するため、ここでは行自体をそのままチェックする。
        // ただし、入力全体を読み込んだ後、各行を処理する。
        
        // 行が空でないことを確認（trim()で空白のみの行を処理）
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 正規表現で妥当性を判定する
        if (validationRegex.test(trimmedLine)) {
            // 1個以上の数字列がカンマで区切られている構造を満たしていると見なす
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
