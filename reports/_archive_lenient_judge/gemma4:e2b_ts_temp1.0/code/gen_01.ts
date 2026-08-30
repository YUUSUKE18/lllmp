/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');

    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換してセットに格納する
    const numbers = input.split(',');
    const uniqueNumbers = new Set<number>();

    for (const item of numbers) {
        const trimmedItem = item.trim();
        if (trimmedItem === "") {
            continue; // 空要素は無視
        }

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedItem, 10);

        if (!isNaN(num)) {
            // セットに追加（重複は自動的に排除される）
            uniqueNumbers.add(num);
        }
        // 整数として解釈できない要素（例: "abc"）は無視される
    }

    // 重複を除いた整数の個数と合計を計算する
    let count = 0;
    let sum = 0;

    // Setから配列に変換して処理することも可能だが、直接Setをイテレートする方が効率的
    for (const num of uniqueNumbers) {
        count++;
        sum += num;
    }

    // 結果を出力する
    console.log(`count=${count} sum=${sum}`);
}

solve();
