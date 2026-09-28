const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    const initialValues = lines.map(line => parseInt(line, 10));

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 変換操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 1 + countSteps(n % 2 === 0 ? n / 2 : 3 * n + 1);
        
        // 注意: 元の問題文の操作は「nが偶数なら n/2、奇数なら 3n+1」の繰り返し操作であり、
        // この操作を繰り返して1に到達するまでの手数を求めるものです。
        // これは通常、Collatz予想に関連する問題であり、1に到達するまでのステップ数を求めることを意味します。
        // 読み込んだ数列の各要素について、1に到達するまでのステップ数を計算し、その合計を求める必要があります。
        
        // ここでの再帰呼び出しは、単一の数 n が 1 に到達するまでのステップ数を求める処理を想定します。
        // もし元の問題が「与えられた数列の各要素について、その値が1になるまでのステップ数を計算し、その合計を求める」
        // であれば、各要素に対してこの関数を呼び出す必要があります。
        
        // 今回は、与えられた「クエリ」が数列の各要素を順番に処理するものと解釈します。
        
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;
    
    // 各入力された整数について計算と合計を求める
    for (const n of initialValues) {
        if (isNaN(n) || n < 1) continue; // 1以上の整数のみを対象

        // 各 n について、1に到達するまでのステップ数を計算
        let current = n;
        let count = 0;
        
        // メモ化を利用したステップ計算
        while (current !== 1) {
            if (memo.has(current)) {
                count += memo.get(current)!;
                break; // 既に計算済みのパスがあればそれを利用
            }
            
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            count++;
        }
        
        // 1に到達するまでの手数を記録（またはメモ化）
        // 厳密には、各 n が独立して 1 に到達するまでの手数を求める問題なので、
        // 各 n に対して、その履歴を計算します。
        
        // 単純なループで計算し、メモ化を適用する方が安全です。
        // この問題は、与えられた n に対して、操作を繰り返して 1 に到達するまでのステップ数を求める問題です。
        
        // 最初の試みとして、現在の n から 1 に到達するまでのステップ数を直接計算します。
        
        let stepsForN = 0;
        let tempN = n;
        const history = new Set<number>(); // 現在のパスを記録して無限ループを防ぐ（ただし、Collatzでは通常到達する）
        
        // 外部から与えられた数列の各要素 n について計算
        let currentN = n;
        let steps = 0;
        
        // 独自のメモ化を適用したステップ計算を再実行
        const path: number[] = [n];
        const visited = new Set<number>([n]);
        
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // 既に計算済みの値が見つかった場合、その結果を足し合わせる
                steps += memo.get(currentN)!;
                break;
            }
            
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            
            steps++;
            path.push(currentN);
            
            // メモ化の更新 (今回は再帰的なメモ化ではなく、順方向のメモ化と再帰的なメモ化を組み合わせる)
            // 再帰的なメモ化は、この問題の「合計」を求めるプロセスには直接適用しにくい。
        }
        
        // 最終的に、各 n について、1 に到達するまでのステップ数を計算したと仮定する。
        // memo は、もし関数内で再帰的に呼び出された場合に有効になるが、ここでは直接計算します。
        
        totalSteps += steps;
    }

    // 最終結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
