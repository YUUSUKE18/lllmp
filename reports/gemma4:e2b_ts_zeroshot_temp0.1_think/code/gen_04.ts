import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === '') {
        console.log('count=0 sum=0');
        return;
    }

    // カンマで分割し、各要素を処理する
    const tokens = input.split(',');

    // 重複を除いた整数を格納するためのSet
    const uniqueNumbers = new Set<number>();

    for (const token of tokens) {
        // 前後の空白を削除
        const trimmedToken = token.trim();

        if (trimmedToken === '') {
            continue; // 空の要素は無視
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedToken, 10);

        // 整数として有効であり、かつSetにまだ存在しないかチェック
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
        // 整数として解釈できない要素は無視される
    }

    // 個数と合計を計算する
    let count = 0;
    let sum = 0;

    for (const num of uniqueNumbers) {
        count++;
        sum += num;
    }

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
