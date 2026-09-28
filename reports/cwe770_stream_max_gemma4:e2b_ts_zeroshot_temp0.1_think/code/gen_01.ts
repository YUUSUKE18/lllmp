const fs = require('fs');

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 max=');
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    let count = 0;
    // 最大値を初期化。負の数を含む可能性があるため、非常に小さな値で初期化する。
    let max = -Infinity;
    let foundNumber = false;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        if (trimmedPart === '') {
            continue; // 空要素は無視
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、かつ整数であるかを確認
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            foundNumber = true;
        }
    }

    // 処理された要素が一つもなかった場合（入力が全て無効な場合）の処理
    if (!foundNumber) {
        // 仕様上、要素が0個の場合の最大値の出力形式を考慮する。
        // ここでは、入力が空または無効な場合、count=0 max= の形式で出力する。
        console.log(`count=0 max=`);
    } else {
        // 結果を出力
        console.log(`count=${count} max=${max}`);
    }
}

solve();
