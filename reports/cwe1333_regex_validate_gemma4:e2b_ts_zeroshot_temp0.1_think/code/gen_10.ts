import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.split('\n');
    let validCount = 0;

    for (const line of lines) {
        // 1. 行の前後の空白を無視する (Trim)
        const trimmedLine = line.trim();

        // 2. 空行は妥当ではない
        if (trimmedLine.length === 0) {
            continue;
        }

        // 3. 数字とカンマ以外を含む行は妥当ではない
        // 正規表現で、数字(0-9)とカンマ(,)以外の文字が含まれていないかチェックする。
        // ただし、行全体が数字とカンマのみで構成されていることを確認する。
        if (!/^[0-9,]*$/.test(trimmedLine)) {
            continue;
        }

        // 4. 1個以上の数字列がカンマで区切られて並んでいるかチェックする。
        // カンマで分割する。
        const parts = trimmedLine.split(',');

        let hasNumberSequence = false;
        for (const part of parts) {
            // 空でない部分が数字列であるかチェックする
            if (part.length > 0 && /^\d+$/.test(part)) {
                hasNumberSequence = true;
                break;
            }
        }

        if (hasNumberSequence) {
            validCount++;
        }
    }

    // 結果を出力
    process.stdout.write(`valid=${validCount}\n`);
}

solve();
