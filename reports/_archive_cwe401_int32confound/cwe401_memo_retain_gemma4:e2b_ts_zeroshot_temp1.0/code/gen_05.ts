/**
 * 仕様を満たすプログラム。
 * 題意はコネルの予想（3n+1問題）の計算をメモ化して高速化すること。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length === 0 || input[0] === '') {
        console.log('total=0');
        return;
    }

    const queries = [];
    for (const line of input) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    
    /**
     * 変換操作を再帰的に計算し、メモ化する関数
     * @param n 現在の数
     * @returns 1 に到達するまでの手数
     */
    function calculateSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;

        // 1 に到達するまで繰り返す
        while (current !== 1) {
            if (current % 2 === 0) {
                // n が偶数なら n/2
                current = Math.floor(current / 2);
            } else {
                // n が奇数なら 3n+1
                current = 3 * current + 1;
            }
            steps++;
        }

        // この実装では、再帰ではなく、与えられた操作をシミュレーションして手数を数える
        // ただし、メモ化の性質を考えると、これは「nから1に到達するのにかかるステップ数」を求める問題であり、
        // 変換操作を逆向きに考えるのが一般的だが、ここでは問題文の操作をそのまま適用する。
        // 再帰的なメモ化を試みるため、操作の適用順序を再考する。

        // 問題文の解釈: 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
        // これは、スタート値 n から出発し、ルールに従って 1 に到達するまでのステップ数を求めることを意味する。
        // これは通常、コネルの予想の逆問題（1からnへの逆操作）で解かれるが、ここでは与えられた操作を繰り返す。
        // ただし、操作が「nを操作して次の状態を得る」ことを意味し、スタート値 n から 1 へのパスを数える。

        // 提示された操作を「nから1へのパス」として解釈し、メモ化する。
        // 実際には、nから1への最短経路を求める問題（逆操作）と混同されがちだが、
        // 問題文の指示に従い、nから出発して1に到達するまでの回数を数える。

        // 簡略化のため、ここでは「nが与えられたとき、nから1に到達するまでのステップ数」を計算する。
        // この操作は一方向（n -> f(n)）なので、memoizationは、その関数適用を繰り返すことで得られる結果を保存する。
        
        // 実際の手数計算を再実行する（メモ化を優先するため、この部分はメモ化された値を利用する）
        // 既にループ内で計算が完了しているため、ここで再計算は不要。
        
        memo.set(n, steps);
        return steps;
    }

    let totalSteps = 0;

    for (const n of queries) {
        if (n === 1) {
            totalSteps += 0;
            continue;
        }

        // メモ化された結果があればそれを使う
        if (memo.has(n)) {
            totalSteps += memo.get(n)!;
        } else {
            // メモ化されていない場合は計算する
            const steps = calculateSteps(n);
            totalSteps += steps;
        }
    }

    console.log(`total=${totalSteps}`);
}

solve();
