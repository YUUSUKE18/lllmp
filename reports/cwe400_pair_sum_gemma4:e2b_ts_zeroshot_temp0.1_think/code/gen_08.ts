import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目から目標値 T を取得
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const target = parseInt(targetLine, 10);

    // 2行目以降から整数を抽出
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

    // 2. 各数値の出現頻度を計算する (Frequency Map)
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount: bigint = 0n; // 64bit整数としてカウント

    // 3. ペアの数を計算する
    // Mapのキーを走査し、重複を避けるために x <= T/2 の範囲で処理する
    for (const [x, countX] of counts.entries()) {
        const y = target - x;

        if (counts.has(y)) {
            const countY = counts.get(y)!;

            if (x < y) {
                // Case 1: x != y
                // x と y のペアの数は count(x) * count(y)
                const product = BigInt(countX) * BigInt(countY);
                pairCount += product;
            } else if (x === y) {
                // Case 2: x == y (つまり 2x = T)
                // 同じ値 x から 2個選ぶ組み合わせの数は count(x) * (count(x) - 1) / 2
                if (countX >= 2) {
                    const combinations = BigInt(countX) * BigInt(countX - 1) / 2n;
                    pairCount += combinations;
                }
            }
        }
    }

    // 4. 結果を出力
    console.log(`pairs=${pairCount.toString()}`);
}

solve();
