import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0) {
        console.log('pairs=0');
        return;
    }

    // 1行目を目標値Tとして取得
    const T = parseInt(input[0].trim(), 10);

    // 2行目以降の整数を抽出
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できる行のみを格納
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    // 過去に出現した数値とその出現回数を記録するマップ
    const frequencyMap = new Map<number, number>();

    // 抽出された整数配列を走査し、ペアの数を数える
    for (const num of numbers) {
        // ターゲットとなる補数 (T - num) を計算
        const complement = T - num;

        // 補数が既にマップに存在する場合、それらがペアを形成する
        if (frequencyMap.has(complement)) {
            pairCount += frequencyMap.get(complement)!;
        }

        // 現在の数 num の出現回数を更新
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
