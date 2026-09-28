import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値 T とする
    const targetLine = input[0];
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const target = parseInt(targetLine.trim(), 10);

    // 2行目以降を数列 A とする
    const sequence: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できる行のみを数列に追加
            if (!isNaN(num)) {
                sequence.push(num);
            }
        }
    }

    // 2. 各要素の出現頻度を計算する
    const counts = new Map<number, number>();
    for (const num of sequence) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 3. ペアの数を数える
    // Mapのキーを順に処理する
    const uniqueNumbers = Array.from(counts.keys()).sort((a, b) => a - b);

    for (const x of uniqueNumbers) {
        const y = target - x;

        if (counts.has(y)) {
            if (x === y) {
                // ケース 1: x + x = target (2x = target)
                const countX = counts.get(x)!;
                // 同じ値のペアの数を計算: C(countX, 2)
                if (countX >= 2) {
                    pairCount += (countX * (countX - 1)) / 2;
                }
            } else if (x < y) {
                // ケース 2: x + y = target (x != y)
                // x と y が異なる値の場合、出現回数の積がペアの数となる
                const countX = counts.get(x)!;
                const countY = counts.get(y)!;
                pairCount += countX * countY;
            }
        }
    }

    // 4. 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
