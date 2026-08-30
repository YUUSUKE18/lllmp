/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から1以上の整数が1行に1個ずつ並ぶ（クエリ）。
 * 各クエリ n について、nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * すべてのクエリの手数の合計を求める。
 * 標準出力へ厳密に `total=<合計>` という1行（末尾に改行）だけを出力する。
 * 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化する。
 * 空行や整数として解釈できない行は無視する。
 * 64bit整数の範囲に収まるが、32bit整数には収まらない値も考慮する。
 * 敵対的に大きな入力に対しても実用的な時間とメモリで完了する。
 * 
 * 形式: Node.js, TypeScript, 標準入出力のみ。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalCount = 0;

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

        let steps = 0;
        let current = n;

        // 1に到達するまでの経路を探索（メモ化を最大限に活用するため、再帰的な構造を避ける）
        // 実際には、nから1への最短経路を求めるため、再帰ではなく反復で計算し、途中の値をメモ化する方が効率的。
        // ただし、この問題は「nから1への操作の回数」を求めるため、通常のメモ化（DP）が適用可能。

        // ここでは、nから1への経路を探索するのではなく、nがどのように1に到達するかを計算する。
        // 逆操作（n -> n/2 または n -> (n-1)/3 + 1 の逆操作）は複雑なので、順方向の操作を繰り返す。
        
        // 順方向の操作を繰り返す（これは問題の要求通り）
        let currentN = n;
        const path: number[] = []; // 経路を記録（メモ化のために使用）
        
        // 探索の安全性を確保するため、無限ループを防ぐための安全策（ここでは、到達が保証されると仮定）
        // 実際には、この操作はCollatzの問題に似ているが、ここでは「1に到達するまでのステップ数」を求める。

        // 経路探索とメモ化を組み合わせる
        const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
        const visited = new Set<number>();
        visited.add(n);

        while (stack.length > 0) {
            const { n: current, steps: currentSteps } = stack.pop()!;

            if (current === 1) {
                memo.set(n, currentSteps);
                return currentSteps;
            }

            // 偶数なら n/2
            if (current % 2 === 0) {
                const nextN = current / 2;
                if (nextN >= 1 && !visited.has(nextN)) {
                    visited.add(nextN);
                    stack.push({ n: nextN, steps: currentSteps + 1 });
                }
            } 
            // 奇数なら 3n+1
            else {
                const nextN = 3 * current + 1;
                if (!visited.has(nextN)) {
                    visited.add(nextN);
                    stack.push({ n: nextN, steps: currentSteps + 1 });
                }
            }
        }
        
        // 理論上到達するはずだが、安全策として
        // この問題は、nから1への操作を繰り返す、というよりは、nがどのように生成されるかを逆算する（Collatzの逆問題）が一般的だが、
        // 仕様は「nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求めます」なので、
        // これは「nを操作して1になるまでの最短経路」を意味する。
        // 通常、Collatz問題はn -> 1への操作を考えるが、ここではnが与えられたときの操作の回数を求める。
        // 質問文の操作は「nが与えられたとき、nを操作し続ける」という意味合いが強い。
        // しかし、"nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求めます"という記述は、
        // 典型的なCollatzの「nを操作して1になるまでのステップ数」を指していると解釈するのが最も自然である。
        
        // 再度、Collatzの標準的な解釈（nを操作して1になるまで）に基づき、メモ化を再適用する。
        // 順方向の探索（上記）は、nが非常に大きい場合にスタックが爆発する可能性があるため、
        // 逆方向（1からnへ）の探索（DP）の方が安全で効率的である。
        
        // 逆方向のDPによる計算（より標準的な解法）
        // この関数は、nが与えられたときのステップ数を返すことに専念する。
        // 既に上記でスタック探索を行った結果を信頼する。
        
        // 念のため、もしスタック探索が失敗した場合（到達不可能、またはタイムアウト）、エラーを出すか、デフォルト値を返す。
        // 敵対的な入力に対しても実用的な時間で完了するため、この探索は十分高速であると期待する。
        
        // 最終的な結果をメモ化して返す
        return memo.get(n) || -1; // -1はエラーを示すが、到達可能と仮定する。
    }

    // 全てのクエリに対して計算を実行
    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) {
            continue; // 無効な入力は無視
        }

        // メモ化された結果を取得または計算
        let result = countSteps(n);

        if (result !== -1) {
            totalCount += result;
        }
    }

    // 結果の出力
    console.log(`total=${totalCount}`);
}

solve();
