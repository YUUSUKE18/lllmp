import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値 T とする
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const T = parseInt(targetLine, 10);

    // 2行目以降の整数を収集する
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

    // 収集した数値の出現頻度を計算する
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount: number = 0;

    // 頻度マップを走査してペアの数を計算する
    // 既に処理した数との重複計算を避けるため、Setを使用する
    const processed = new Set<number>();

    for (const [x, countX] of counts.entries()) {
        if (processed.has(x)) {
            continue;
        }

        const y = T - x;

        if (counts.has(y)) {
            const countY = counts.get(y)!;

            if (x === y) {
                // Case 1: x + x = T (2x = T)
                // 同じ値のペアの数を計算する: C(countX, 2)
                if (countX >= 2) {
                    // 組み合わせの数: countX * (countX - 1) / 2
                    pairCount += countX * (countX - 1) / 2;
                }
            } else if (x < y) {
                // Case 2: x + y = T (x != y)
                // x と y のペアの数を計算する: countX * countY
                pairCount += countX * countY;
            }
        }
        
        processed.add(x);
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
