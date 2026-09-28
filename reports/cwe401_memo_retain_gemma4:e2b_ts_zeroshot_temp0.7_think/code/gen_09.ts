import * as fs from 'fs';

function solve() {
    // 標準入力全体を読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力をスペースや改行で分割し、整数としてフィルタリングする
    const lines = input.split(/\s+/).filter(s => s.length > 0);
    const queries = lines.map(Number);

    // メモ化テーブル
    const memo = new Map<number, number>();
    let totalSteps = 0;

    /**
     * n から 1 に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 開始数
     * @returns 手数
     */
    function countSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let current = n;
        const steps = [];

        // 1 に到達するまでの経路を記録し、メモ化のために一時的に保持する
        while (current !== 1) {
            // 既に計算済みの値があれば、その結果を再利用する（再帰ではなく反復で処理する方が効率的）
            if (memo.has(current)) {
                const cachedSteps = memo.get(current)!;
                // 現在のステップ数にキャッシュされたステップ数を加算し、残りのステップを計算する
                const remainingSteps = countSteps(current);
                const totalRemainingSteps = cachedSteps + remainingSteps;
                
                // 現在のnに対する結果を計算し、すぐにメモに保存してループを抜ける
                memo.set(n, totalRemainingSteps);
                return totalRemainingSteps;
            }

            steps.push(current);
            if (current % 2 === 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
        }
        
        // ループが終了した後の計算（これは通常、上記キャッシュ処理でカバーされるはずだが、念のため）
        // ここでは、経路を辿りながら計算したステップ数を返す
        let count = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            count++;
        }

        // 経路上のすべての値のメモ化（これは再帰呼び出しを避けるための最適化として重要）
        for (const val of steps) {
             // 経路上の各値が到達するのに必要なステップ数を計算し、メモする
             // ただし、この問題では、nがクエリであるため、nから1への直接的なパスの長さを求めるのが目的なので、
             // 再帰的な構造を採用し、必要な値をメモする方が効率的。
        }
        
        // シンプルに、再帰呼び出しを主軸とする（メモ化の構造を整理）
        // 再帰的な定義に戻る。
        
        // --- 再帰的な実装に置き換え ---
        return calculateMemoizedSteps(n);
    }

    /**
     * 再帰的なメモ化関数
     * @param n 開始数
     * @returns n から 1 への手数
     */
    function calculateMemoizedSteps(n: number): number {
        if (n === 1) {
            return 0;
        }
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let nextN: number;
        if (n % 2 === 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算
        const steps = 1 + calculateMemoizedSteps(nextN);

        // 結果をメモ化
        memo.set(n, steps);
        return steps;
    }


    // すべてのクエリに対して計算を実行し、合計を求める
    for (const n of queries) {
        if (n >= 1) {
            // メモ化された関数を使って計算
            const result = calculateMemoizedSteps(n);
            totalSteps += result;
        }
    }

    // 結果を出力
    console.log(`total=${totalSteps}`);
}

solve();
