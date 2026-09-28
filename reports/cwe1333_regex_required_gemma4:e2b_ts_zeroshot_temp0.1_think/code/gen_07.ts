import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8');
    
    // 行ごとに分割する
    const lines = input.split('\n');
    
    let validCount = 0;

    // 各行を検証する
    for (const line of lines) {
        // 行の前後の空白を無視する（trim）
        const trimmedLine = line.trim();

        // 1. 空行は妥当ではない
        if (trimmedLine.length === 0) {
            continue;
        }

        // 2. 正規表現による妥当性の判定
        // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
        // これは、行が数字(\d)とカンマ(,)のみで構成されており、かつ少なくとも1文字以上あることを意味する。
        // 末尾のカンマは許容される。
        // 正規表現: ^[\d,]+$
        // ^: 行の開始
        // [\d,]+: 1文字以上の数字またはカンマ
        // $: 行の終了
        const regex = /^[\d,]+$/;

        if (regex.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
