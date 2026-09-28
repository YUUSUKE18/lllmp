import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.split('\n');
    let validCount = 0;

    // 正規表現: 行が数字(\d)とカンマ(,)のみで構成されていることを確認する。
    // 末尾のカンマも許容し、空行は除外する。
    // ^[\d,]*$ は、行が数字とカンマのみで構成されていることを確認する。
    // ただし、このパターンだけでは「数字列が並んでいる」という構造チェックが不十分なため、
    // 以下のロジックで「数字が一つ以上含まれていること」も同時に確認する。
    const validationRegex = /^[\d,]+$/;

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.length === 0) {
            // 空行は妥当ではない
            continue;
        }

        // 行の前後の空白は無視する (trim済み)
        
        // 正規表現による妥当性の判定
        // 妥当な行は、数字とカンマのみで構成され、かつ空ではないこと。
        // 末尾のカンマを許容するため、ここでは行全体が数字とカンマで構成されていることを確認する。
        // ただし、仕様の「1 個以上の数字列がカンマで区切られて並んでいる」という構造を厳密に満たすため、
        // 以下のロジックで、数字が一つ以上含まれていることを確認する。
        
        // 構造チェック: 数字とカンマのみで構成されているか
        if (!validationRegex.test(trimmedLine)) {
            continue;
        }

        // 構造チェックを通過した場合、数字が一つ以上含まれているかを確認する。
        // (例: "," や ",," は数字列ではないため、これは妥当ではない)
        if (/\d/.test(trimmedLine)) {
            validCount++;
        }
    }

    // 結果を出力
    process.stdout.write(`valid=${validCount}\n`);
}

solve();
