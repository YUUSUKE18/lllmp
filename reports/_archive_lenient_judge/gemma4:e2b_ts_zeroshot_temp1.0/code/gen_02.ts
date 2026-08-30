/**
 * 標準入力からカンマ区切りの整数列を受け取り、重複を除いた整数の個数と合計を計算して出力するプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 sum=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const numbers = input.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const uniqueNumbers = new Set<number>();
    let sum = 0;

    for (const item of numbers) {
        // 整数として解釈できるかチェックし、変換する
        const num = parseInt(item, 10);
        if (!isNaN(num)) {
            uniqueNumbers.add(num);
        }
    }

    // 重複を除いた整数の個数を計算
    const count = uniqueNumbers.size;

    // 合計を計算
    uniqueNumbers.forEach(num => {
        sum += num;
    });

    // 結果を出力
    console.log(`count=${count} sum=${sum}`);
}

solve();
