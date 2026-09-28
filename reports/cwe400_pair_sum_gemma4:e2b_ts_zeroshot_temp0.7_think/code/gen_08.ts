import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        // 入力がない場合は終了
        return;
    }

    // 1行目を目標値 T として取得
    const targetLine = input[0].trim();
    if (!targetLine) {
        // 目標値がない場合は終了
        return;
    }
    const T = parseInt(targetLine, 10);

    // 2行目以降の数値を読み込み、整数配列として格納
    const A: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できない行は無視する (parseIntがNaNを返す場合)
            if (!isNaN(num)) {
                A.push(num);
            }
        }
    }

    // 2. 各数値の頻度を計算する (Frequency Map)
    const freqMap = new Map<number, number>();
    for (const num of A) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 3. ペアの数を計算する
    // Mapのキーを走査して、ペアの組み合わせを数える
    for (const [x, countX] of freqMap.entries()) {
        const y = T - x;

        if (freqMap.has(y)) {
            const countY = freqMap.get(y)!;

            if (x < y) {
                // x と y が異なる場合 (x != y)
                // x の出現回数 * y の出現回数 = ペアの数
                pairCount += countX * countY;
            } else if (x === y) {
                // x と y が等しい場合 (2x = T)
                // 同じ値の要素から 2 つを選ぶ組み合わせ (n C 2)
                // n * (n - 1) / 2
                pairCount += countX * (countX - 1) / 2;
            }
        }
    }

    // 4. 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
