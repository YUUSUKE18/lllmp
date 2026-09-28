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

    // 妥当な行の判定のための正規表現
    // ^\d+          : 行は少なくとも1つの数字で始まる
    // (?:,\d+)*     : カンマと数字のペアが0回以上繰り返される (例: ,1,2)
    // ,?            : 末尾にカンマが0回または1回続く (末尾のカンマは許容)
    // $             : 行の終わり
    // このパターンは、数字とカンマのみで構成され、少なくとも1つの数字を含むことを保証する。
    const validationRegex = /^\d+(?:,\d+)*,?$/;

    for (const line of lines) {
        // 行の前後の空白は無視する（trimは既にinput全体で処理されているが、念のため行ごとに処理）
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 正規表現で妥当性を判定
        if (validationRegex.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
