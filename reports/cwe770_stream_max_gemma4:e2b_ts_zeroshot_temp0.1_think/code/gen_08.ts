import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を処理する
    const tokens = input.split(',');

    let count = 0;
    let max = -Infinity;
    let foundValidNumber = false;

    for (const token of tokens) {
        // 前後の空白を削除
        const trimmedToken = token.trim();

        if (trimmedToken === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = Number(trimmedToken);

        // isFiniteで数値であり、かつ整数であるかを確認する
        if (Number.isInteger(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            foundValidNumber = true;
        }
    }

    // 有効な要素が見つからなかった場合（入力が全て無効な場合）の処理
    if (!foundValidNumber) {
        // 仕様上、要素数と最大値を求めるため、要素が0個の場合はcount=0, max=0とするのが自然だが、
        // 厳密には入力された要素のみを考慮する。ここでは、有効な要素が0個ならcount=0, max=0とする。
        console.log(`count=0 max=0`);
    } else {
        // 結果を出力
        console.log(`count=${count} max=${max}`);
    }
}

solve();
