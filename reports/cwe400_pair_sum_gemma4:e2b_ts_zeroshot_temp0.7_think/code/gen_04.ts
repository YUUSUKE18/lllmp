import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値 T
    let target: bigint;
    try {
        target = BigInt(input[0].trim());
    } catch (e) {
        // 目標値が不正な場合は処理を終了
        console.log('pairs=0');
        return;
    }

    // 2行目以降: 数列 A
    const numbers: bigint[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line === '') continue;

        try {
            const num = BigInt(line);
            numbers.push(num);
        } catch (e) {
            // 整数として解釈できない行は無視
            continue;
        }
    }

    if (numbers.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 2. 頻度マップを作成 (BigIntをキーとして使用)
    const frequencyMap = new Map<bigint, number>();
    for (const num of numbers) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 3. ペアの数を計算する
    // 頻度マップのキーをソートして、x < y のペアのみを数える
    const uniqueNumbers = Array.from(frequencyMap.keys()).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    for (const x of uniqueNumbers) {
        const y = target - x;

        // x と y が同じ値の場合 (2x = T)
        if (x === y) {
            const count = frequencyMap.get(x)!;
            // 同じ値のペアの数を計算: nC2 = n * (n - 1) / 2
            if (count >= 2) {
                // BigIntでの計算
                const pairs = (count * BigInt(count - 1)) / 2n;
                pairCount += Number(pairs);
            }
        } 
        // x と y が異なる値の場合 (x < y の制約を適用)
        else if (x < y) {
            if (frequencyMap.has(y)) {
                const countX = frequencyMap.get(x)!;
                const countY = frequencyMap.get(y)!;
                // 組み合わせの数を計算: countX * countY
                pairCount += countX * countY;
            }
        }
    }

    // 4. 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
