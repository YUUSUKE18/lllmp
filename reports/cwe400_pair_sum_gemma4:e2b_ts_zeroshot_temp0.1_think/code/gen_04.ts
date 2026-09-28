import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値Tとして取得
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const T = parseInt(targetLine, 10);

    // 2行目以降の整数を抽出
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

    // 2. 各数値の出現頻度を計算する
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 3. ペアの数を計算する
    // Mapのキーを走査し、各数xについてT-xが存在するか確認する
    for (const [x, countX] of counts.entries()) {
        const y = T - x;

        if (counts.has(y)) {
            const countY = counts.get(y)!;

            if (x < y) {
                // x と y が異なる場合 (x + y = T)
                // x の出現回数 * y の出現回数
                pairCount += countX * countY;
            } else if (x === y) {
                // x と y が等しい場合 (2x = T)
                // 同じ数 x の中から 2 つを選ぶ組み合わせ (nC2)
                // n * (n - 1) / 2
                pairCount += countX * (countX - 1) / 2;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
