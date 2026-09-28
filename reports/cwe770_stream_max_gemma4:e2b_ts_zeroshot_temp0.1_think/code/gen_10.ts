import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    // process.stdin.readSync() を使用して、標準入力全体を同期的に読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        // 入力が空の場合は何も出力しない
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    let count = 0;
    let max = -Infinity;
    let foundValidNumber = false;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        if (trimmedPart === '') {
            continue; // 空の要素は無視
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数字のみで構成されているか（非数値文字が含まれていないか）を確認する
        // ただし、仕様上は「整数として解釈できない要素も無視」なので、parseIntが成功し、かつ元の文字列が数字のみで構成されているかを確認する。
        // ここでは、parseIntが成功し、かつその値が有効な整数であることを確認する。
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるか（JavaScriptのNumber型は通常これに対応する）
            // 念のため、安全性を高めるために、元の文字列が数字のみで構成されているかを確認する
            if (String(num) === trimmedPart) {
                count++;
                if (num > max) {
                    max = num;
                }
                foundValidNumber = true;
            }
        }
    }

    // 結果を出力
    if (foundValidNumber) {
        console.log(`count=${count} max=${max}`);
    }
}

solve();
