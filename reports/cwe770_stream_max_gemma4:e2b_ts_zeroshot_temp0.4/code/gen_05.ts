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
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値を適切に設定

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として解釈でき、かつ64bit整数の範囲内であるかを確認する
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 読み取った要素が一つもなかった場合（入力が空または無効な値のみだった場合）の処理
    if (count === 0) {
        // 仕様上、要素数と最大値を求める必要があるため、入力から有効な整数が見つからなかった場合は、
        // 空の入力に対する一般的な解釈として count=0, max=0 を出力する。
        // ただし、もし入力が「1,2,3」のような形式で、値がすべて無効だった場合もcount=0になる。
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
