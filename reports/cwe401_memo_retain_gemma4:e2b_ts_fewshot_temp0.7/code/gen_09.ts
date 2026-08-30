const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('total=0');
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log('total=0');
        return;
    }

    // 1. 整数列を読み込む
    const initialNumbers = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n));

    if (initialNumbers.length === 0) {
        console.log('total=0');
        return;
    }

    // 2. メモ化テーブルの初期化
    const memo = new Map<number, number>();
    memo.set(1, 0);

    // 3. 各クエリの計算と合計の計算
    let total = 0;

    for (const n of initialNumbers) {
        if (n === 1) {
            total += 0;
            continue;
        }

        let steps = 0;
        let current = n;
        const path = [];

        // 繰り返し操作を適用し、経路を記録してメモ化する
        while (current !== 1) {
            path.push(current);
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
        }
        // 1に到達するまでの手数はpathの長さ（現在の値が1になるまでのステップ数）
        // ただし、nが1のときは0ステップ。n>1のときはpath.lengthがステップ数になる。
        steps = path.length;

        // 経路上の全ての要素のメモ化（この問題では、各nに対する計算結果をメモ化する）
        // ただし、この問題は個々のnに対する操作の回数を求める問題なので、
        // 経路上の各ステップで計算された値をメモ化するのが最も効率的。
        // ここでは、nから1への経路の長さを求めるため、直接メモ化テーブルに結果を格納する。
        memo.set(n, steps);
        total += steps;
    }

    // 4. 結果の出力
    console.log(`total=${total}`);
}

solve();
