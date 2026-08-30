/**
 * 標準入力から目標値と整数を受け取り、その目標値になる2つの整数の組の個数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値として取得
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const target = parseInt(targetLine, 10);

    if (isNaN(target)) {
        // 目標値が整数でない場合は処理を終了（仕様上は整数と仮定されるが安全策）
        console.log('pairs=0');
        return;
    }

    // 2行目以降を整数のリストとして取得
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できた場合のみ格納
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で a[i] + a[j] = target となるものを数える (i != j)
    // O(n^2) の全探索
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
