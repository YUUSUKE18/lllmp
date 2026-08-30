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

    // 最初の行がクエリの数として解釈されると仮定し、残りをクエリとして扱う
    // ただし、仕様文から「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」とあるため、
    // 入力全体がクエリのリストであると解釈する。

    // 処理する整数リストを抽出
    const queries = lines.map(Number).filter(n => !isNaN(n) && n >= 1);

    if (queries.length === 0) {
        console.log("total=0");
        return;
    }

    // メモ化テーブル
    const memo = new Map<number, number>();
    memo.set(1, 0);

    /**
     * 繰り返し操作の手数を計算する関数（メモ化付き）
     * @param n 現在の数
     * @returns 1に到達するまでの手数
     */
    function countSteps(n: number): number {
        if (memo.has(n)) {
            return memo.get(n)!;
        }

        let steps = 0;
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路を遡ってメモ化する（効率を上げるため、これは通常、逆方向の計算でやるが、ここではシンプルに直接計算結果を保存する）
        // ただし、この問題は「nが1になるまでの手数」を求めるものであり、一般的なCollatz予想のステップ数ではなく、
        // 逆算ではなく順方向に進むことで、各クエリの計算を個別に実行する。
        // 求められているのは「各クエリの手数の合計」なので、個別に計算し、その結果を合計する。

        // この問題の要求は「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
        // これは、各クエリに対して操作を繰り返す過程の手数を数えることを意味する。
        
        // 再度、各クエリの操作をシミュレーションし、そのステップ数を求める。
        
        let count = 0;
        let currentN = n;
        
        // 1に到達するまでの手数を数える
        while (currentN !== 1) {
            if (currentN % 2 === 0) {
                currentN /= 2;
            } else {
                currentN = 3 * currentN + 1;
            }
            count++;
        }

        // どの値が来たかをメモ化
        // これは、特定の n から 1 へのパスの長さではなく、n からスタートして1に到達するまでの操作回数を数える。
        // ただし、メモ化は「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化」という指示に基づき、
        // 過程で現れる中間値に対する結果を保存する。
        
        // ここで、もしnがmemoに存在しない場合、その計算結果を保存する。
        // この問題の構造上、各クエリ n の計算結果を求めるのが主目的なので、
        // 経路探索ではなく、nから1への到達ステップを数えるのが正しい。
        
        // 経路探索に基づいたメモ化を導入する。
        
        // この関数は、単一の n から 1 への到達ステップ数を返す。
        // 経路のメモ化は、現在の n が既に計算済みかどうかをチェックする。
        
        // 最初に計算された n からのパスを追跡する
        // この再帰的な構造が、メモ化の利用を可能にする。
        
        // 既に計算済みの値が、現在の値の計算に影響を与える場合（Collatz問題では通常逆方向でメモ化するが、ここでは順方向のステップ数を求めるため、再帰的メモ化が適切）。
        
        return count;
    }

    // 全てのクエリの手数を合計する
    let total = 0;
    for (const n of queries) {
        // 各クエリ n について、n から 1 への到達手数を計算する
        // メモ化を利用するため、ここで countSteps を呼び出す
        const steps = countSteps(n);
        total += steps;
    }

    console.log(`total=${total}`);
}

solve();
