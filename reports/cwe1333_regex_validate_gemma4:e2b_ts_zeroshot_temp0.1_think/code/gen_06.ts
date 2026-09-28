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
        // 行の前後の空白を無視する（trimは行の先頭と末尾の空白を削除する）
        const trimmedLine = line.trim();

        // 1. 空行の判定
        if (trimmedLine.length === 0) {
            continue; // 空行は妥当ではない
        }

        // 2. 数字とカンマ以外の文字が含まれていないかチェック
        // 正規表現を使って、数字(0-9)とカンマ(,)以外の文字が存在するか確認する
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue; // 数字とカンマ以外を含む行は妥当ではない
        }

        // 3. 1個以上の数字列が存在するかチェック
        // 数字が一つでも含まれていれば、それは数字列が存在することを意味する。
        // ただし、カンマのみの行（例: ",,"）は数字列を持たないため、このチェックで除外される。
        if (/[0-9]/.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    console.log(`valid=${validCount}`);
}

solve();
