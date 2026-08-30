import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let isValid = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数としてパースを試みる。空文字列や非数値を含むものは無視する。
        const num = Number(trimmedPart);

        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数の範囲内か確認（Node.jsのNumberはIEEE 754倍精度だが、ここでは問題の制約に従う）
            // 数値が安全に扱える範囲であればOKとする。
            if (num >= -2**63 && num <= 2**63 - 1) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
                isValid = true;
            }
        }
    }

    // データが存在しなかった場合や、有効な数値が見つからなかった場合の処理（仕様上は入力があれば何らかの出力を期待するが、ここでは数値を全て処理した結果を出力）
    if (count === 0) {
        // 入力が空または数値が一つもなかった場合。問題文の制約から、少なくとも1行出力する必要がある。
        // 空の入力に対する挙動は仕様に明記されていないが、要素数が0の場合は count=0 max=0 が妥当。
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
