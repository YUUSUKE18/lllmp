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

    // 妥当性の判定を行う正規表現
    // ^[\d,]+$ : 行全体が1文字以上の数字(\d)またはカンマ(,)のみで構成されていることを要求する。
    // これにより、空行や数字とカンマ以外の文字を含む行が除外される。
    const validationRegex = /^[\d,]+$/;

    for (const line of lines) {
        // 行の前後の空白は無視する（trimは入力時に行ごとに適用される）
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 正規表現で判定
        if (validationRegex.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
