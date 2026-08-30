import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let uniqueNumbers = new Set<number>();

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 整数として有効であり、NaNでないことを確認する
        if (!isNaN(num)) {
            // 数値が有限であり、64bitの範囲内にあることを確認（ここでは標準のNumber型で十分だが、念のため）
            // parseIntの結果はJavaScriptのNumber型（IEEE 754倍精度浮動小数点数）なので、
            // それをそのままSetに格納する。問題の制約上、合計が64bitに収まれば問題ない。
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数を処理する
    const uniqueArray = Array.from(uniqueNumbers);

    // 個数と合計を計算する
    let count = 0;
    let sum = 0;

    for (const num of uniqueArray) {
        count++;
        sum += num;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
