import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    // 入力を改行で分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries = lines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            // BigIntとしてパースする
            try {
                return BigInt(line);
            } catch (e) {
                // 整数として解釈できない行は無視
                return null;
            }
        })
        .filter((n): n is bigint => n !== null);

    // メモ化テーブル
    const memo = new Map<bigint, number>();
    let totalSteps = 0;

    /**
     * n が 1 に到達するまでの手数を計算する関数 (メモ化付き)
     * @param n 初期値
     * @returns 手数
     */
    function countSteps(n: bigint): number {
        if (n === 1n) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        let steps = 0;
        const history = new Map<bigint, number>(); // 現在のパスの履歴を追跡するためのマップ

        // サイクル検出のためのチェック（Collatzの性質上、通常は1に収束するが、念のため）
        // ただし、この問題では1に到達するまでのステップ数を求めるため、単純な反復で十分。

        while (current !== 1n) {
            // サイクル検出（無限ループ防止）
            if (history.has(current)) {
                // サイクルに入った場合、1に到達しない（または1に到達する前にサイクルに入った）
                // Collatzの文脈では、1に収束しないサイクルに陥る可能性があるが、
                // 問題の仕様上、1に到達することを前提とする。
                // ここでは、サイクルに入った場合は計算を停止し、エラーとするか、あるいは
                // サイクル内のステップ数を計算する（ここでは、問題の意図に従い、1に到達しない場合は処理を続行しない、またはエラーとする）。
                // 標準的なCollatz問題では、1に収束すると仮定する。
                // 念のため、サイクル検出は省略し、計算が収束することを信じる。
            }
            
            if (current % 2n === 0n) {
                // n が偶数なら n/2
                current /= 2n;
            } else {
                // n が奇数なら 3n+1
                current = 3n * current + 1n;
            }
            steps++;
        }

        // 結果をメモ化して返す
        memo.set(n, steps);
        return steps;
    }

    // すべてのクエリを処理する
    for (const n of queries) {
        const steps = countSteps(n);
        totalSteps += steps;
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
