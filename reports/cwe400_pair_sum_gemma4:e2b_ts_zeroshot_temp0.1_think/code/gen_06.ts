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
    const T = parseInt(targetLine);

    // 2行目以降の整数を抽出する
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line);
            // 整数として解釈できる行のみを抽出
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 2つの組の個数を数えるための頻度マップを初期化
    // キー: 数値, 値: 出現回数
    const freqMap = new Map<number, number>();
    let pairCount = 0;

    // 2つの和問題 (Two-Sum) のアルゴリズムを適用する
    for (const num of numbers) {
        // 必要な補数 C を計算
        const complement = T - num;

        // 補数が既にマップに存在する場合、ペアの数を加算する
        if (freqMap.has(complement)) {
            pairCount += freqMap.get(complement)!;
        }

        // 現在の数をマップに追加または更新する
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
