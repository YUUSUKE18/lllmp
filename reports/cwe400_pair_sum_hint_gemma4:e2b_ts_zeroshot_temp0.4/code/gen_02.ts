/**
 * 標準入力から目標値と整数のリストを読み込み、
 * 目標値になる2つの組の数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値としてパース
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const target = BigInt(targetLine);

    // 2行目以降を整数としてパース
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // BigIntとして読み込む
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
    }

    let pairCount = 0n;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target を満たすものを数える。
    // i != j である必要がある。
    // O(N^2) の全探索で十分であり、Nが大きくなっても実用的な時間で完了する。
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                pairCount += 1n;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount.toString()}`);
}

solve();
