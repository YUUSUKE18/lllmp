import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 max=-Infinity'); // 入力が空の場合のデフォルト処理
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    let count = 0;
    // 最大値を初期化。負の無限大で初期化することで、最初の有効な数値が必ず最大値になるようにする。
    let max: number = -Infinity;
    let foundValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();

        // 空の要素は無視
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈できるかチェック
        // Number()で変換し、isFinite()とNumber.isInteger()で整数であることを確認する
        const num = Number(trimmedPart);

        if (Number.isInteger(num) && isFinite(num)) {
            count++;
            if (!foundValidNumber || num > max) {
                max = num;
                foundValidNumber = true;
            }
        }
    }

    // 結果を出力
    // 最初の要素が全て無効な場合（例: ",,"）は count=0 max=-Infinity となるが、
    // 仕様上、値が64bit整数に収まるため、-Infinityは許容される。
    console.log(`count=${count} max=${max}`);
}

solve();
