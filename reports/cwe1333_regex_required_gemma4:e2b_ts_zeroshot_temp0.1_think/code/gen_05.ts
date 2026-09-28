import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    
    if (input === "") {
        console.log("valid=0");
        return;
    }

    // 行ごとに分割する
    const lines = input.split('\n');
    let validCount = 0;

    // 妥当性の判定に使用する正規表現
    // ^[\d,]+$ : 行全体が1文字以上の数字(\d)またはカンマ(,)のみで構成されていることを確認する。
    // これにより、空行や数字以外の文字を含む行は除外される。
    // また、少なくとも1つの数字が含まれていることを暗黙的に保証する。
    const validationRegex = /^[\d,]+$/;

    for (const line of lines) {
        // 行の前後の空白を無視する（trimは入力処理時に行われるが、念のため）
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 正規表現で妥当性を判定する
        if (validationRegex.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
