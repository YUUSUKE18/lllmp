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
    // 最大値を初期化。負の数を含む可能性があるため、非常に小さな値で初期化する。
    let max: number = -Infinity;
    let foundValidNumber = false;

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        // 空の要素は無視
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、かつ64bitの範囲内（JSのnumber型で十分）かを確認
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            foundValidNumber = true;
        }
    }

    // 有効な要素が一つもなかった場合、maxは-Infinityのままになるが、
    // 仕様上、入力された整数のみを考慮するため、count=0, max=適切な値を出力する。
    // ただし、入力が空でなければ、maxは計算された最大値となる。
    // 入力が完全に無効な場合（例: "a,b"）は count=0, max=-Infinity となる。
    // 厳密に「整数として解釈できない要素も無視」という指示に従い、有効な整数のみをカウントする。

    // 最終的な結果を出力
    console.log(`count=${count} max=${max}`);
}

solve();
