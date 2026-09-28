/**
 * 標準入力から目標値と整数群を読み込み、目標値になる2つの組の個数を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目は目標値
    const target = parseInt(input[0].trim(), 10);
    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了（仕様上は必ず与えられると仮定するが、安全のため）
        return;
    }

    // 2行目以降の整数群を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) (i != j) を探す
    // O(N^2) の方法で全てのペアをチェックする
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
