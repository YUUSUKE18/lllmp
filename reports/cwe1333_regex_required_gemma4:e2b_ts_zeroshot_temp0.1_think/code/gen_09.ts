import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8');
    
    // 行ごとに分割し、前後の空白を除去して処理する
    const lines = input.split('\n');
    let validCount = 0;

    // 妥当な行数をカウントする
    for (const line of lines) {
        const trimmedLine = line.trim();

        // 1. 空行は妥当ではない
        if (trimmedLine.length === 0) {
            continue;
        }

        // 2. 数字とカンマ以外を含む行は妥当ではない
        // 正規表現: ^[\d,]+$
        // これは、行全体が1文字以上の数字(\d)またはカンマ(,)のみで構成されていることを確認する。
        // これにより、アルファベットやその他の記号が含まれている行は除外される。
        const contentRegex = /^[\d,]+$/;
        
        if (!contentRegex.test(trimmedLine)) {
            continue;
        }

        // 3. 1個以上の数字列がカンマで区切られて並んでいるかを確認する
        // 数字が少なくとも1つ含まれている必要がある。
        // (例: カンマのみの行 `,` は除外される)
        const hasDigit = /\d/.test(trimmedLine);

        if (hasDigit) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
