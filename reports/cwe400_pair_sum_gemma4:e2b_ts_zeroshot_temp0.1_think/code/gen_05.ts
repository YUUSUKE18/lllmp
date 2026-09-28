import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1. 目標値の取得
    const target = parseInt(lines[0], 10);

    // 2. 数値のリストの取得とフィルタリング
    const numbers: number[] = [];
    for (let i = 1; i < lines.length; i++) {
        const num = parseInt(lines[i], 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 3. 各数値の出現頻度を計算
    const frequencyMap = new Map<number, number>();
    for (const num of numbers) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 4. ペアの数を計算
    // Mapのキーをソートして、重複カウントを効率的に行う
    const uniqueNumbers = Array.from(frequencyMap.keys()).sort((a, b) => a - b);

    for (const x of uniqueNumbers) {
        const y = target - x;

        if (frequencyMap.has(y)) {
            const freqX = frequencyMap.get(x)!;
            const freqY = frequencyMap.get(y)!;

            if (x === y) {
                // Case 1: x + x = target (x = target / 2)
                // x と x のペアの数を計算: nC2 = n * (n - 1) / 2
                pairCount += freqX * (freqX - 1) / 2;
            } else if (x < y) {
                // Case 2: x + y = target (x != y)
                // x と y のペアの数を計算: freq(x) * freq(y)
                pairCount += freqX * freqY;
            }
        }
    }

    // 5. 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
