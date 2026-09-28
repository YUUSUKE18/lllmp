import * as process from 'process';

function solve() {
    // 標準入力全体を読み込む
    const input = process.stdin.readSync();
    
    if (!input) {
        // 入力が空の場合は何もしない
        return;
    }

    // カンマで分割し、各要素を処理する
    const tokens = input.split(',');

    // 重複を除いた整数を格納するためのSet
    const uniqueNumbers = new Set<number>();

    for (const token of tokens) {
        // 前後の空白をトリム
        const trimmedToken = token.trim();

        if (trimmedToken === '') {
            continue; // 空要素は無視
        }

        // 整数としてパースを試みる
        const num = Number(trimmedToken);

        // 整数として有効であり、Setにまだ存在しないかチェック
        if (!isNaN(num) && Number.isInteger(num)) {
            uniqueNumbers.add(num);
        }
        // 整数として解釈できない要素は無視される
    }

    // 個数と合計を計算する
    const count = uniqueNumbers.size;
    let sum = 0;

    // 合計を計算
    for (const num of uniqueNumbers) {
        sum += num;
    }

    // 結果を出力
    process.stdout.write(`count=${count} sum=${sum}\n`);
}

solve();
