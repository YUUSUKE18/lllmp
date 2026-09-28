import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を処理する
    const parts = input.split(',');

    // 重複を除いた整数を格納するためのSet
    const uniqueNumbers = new Set<number>();

    for (const part of parts) {
        // 前後の空白を削除
        const trimmedPart = part.trim();

        if (trimmedPart === "") {
            continue; // 空要素は無視
        }

        // 整数としてパースを試みる
        const num = Number(trimmedPart);

        // 整数として有効であり、NaNでないことを確認
        if (!isNaN(num)) {
            // 整数として格納
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
    console.log(`count=${count} sum=${sum}`);
}

solve();
