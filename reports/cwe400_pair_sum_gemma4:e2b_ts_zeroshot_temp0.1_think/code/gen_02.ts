import * as process from 'process';

function solve() {
    const input = process.stdin.readSync();
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1. 目標値の読み込み
    const target = parseInt(lines[0], 10);
    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了
        return;
    }

    // 2. 数値の読み込みとフィルタリング
    const numbers: number[] = [];
    for (let i = 1; i < lines.length; i++) {
        const num = parseInt(lines[i], 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 3. 頻度マップの作成
    const freqMap = new Map<number, number>();
    for (const num of numbers) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pairCount = 0;

    // 4. ペアの計算
    // 頻度マップのキーをソートして、重複を避けるために効率的に処理する
    const uniqueNumbers = Array.from(freqMap.keys()).sort((a, b) => a - b);

    for (const a of uniqueNumbers) {
        const countA = freqMap.get(a)!;
        const b = target - a;

        if (freqMap.has(b)) {
            const countB = freqMap.get(b)!;

            if (a < b) {
                // Case 1: a != b. (a, b) のペアを数える。
                // a と b の組み合わせは、それぞれ countA * countB 通り存在する。
                pairCount += countA * countB;
            } else if (a === b) {
                // Case 2: a == b. (2a = target) の場合。
                // 同じ値 a から 2 つ選ぶ組み合わせを数える。
                // C(countA, 2) = countA * (countA - 1) / 2
                pairCount += countA * (countA - 1) / 2;
            }
        }
    }

    // 5. 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
