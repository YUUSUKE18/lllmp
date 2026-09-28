/**
 * 仕様を満たすプログラム。
 * コナグニセル（Collatz）数列に関するクエリの計算とメモ化を行います。
 */

function solve() {
    const fs = require('fs');

    // 標準入力から全てのデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    // 入力を1行ごとに分割し、整数としてフィルタリングする
    const lines = input.split('\n');
    const queries: number[] = [];
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const num = parseInt(trimmedLine, 10);
            if (!isNaN(num) && num >= 1) {
                queries.push(num);
            }
        }
    }

    // メモ化テーブル
    const memo: Map<number, number> = new Map();
    let totalCount = 0;

    /**
     * コナグニセル数列の手数 (停止条件: 1) を計算する関数。
     * メモ化を利用する。
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
        const steps: number[] = [];
        
        // 1に到達するまでの過程を追跡し、ループを検出するためのセット
        const path = new Set<number>();

        while (current !== 1) {
            // 循環を検出
            if (path.has(current)) {
                // 循環が発生した場合、この経路は無限に続く。
                // 問題の文脈（1に到達するまでの手数）から、これは起こらないと仮定するが、
                // もし発生した場合の処理が必要であればここで定義する。
                // 一般的なコナグニセル問題では、循環が発生しないことが知られている。
                // 今回は、無限ループを避けるため、この関数が呼び出されることは想定外とする。
                // 厳密には、ループの途中で再帰的な呼び出しやメモ化で無限に続く可能性があるため、
                // ここでは「到達不可能」としてエラーを出すか、あるいは計算が停止しないことを示す必要がある。
                // しかし、仕様は「1に到達するまでの手数」なので、1に到達することを前提とする。
                // 念のため、ここでは深さ制限などを設ける代わりに、一般的なケースに従い、
                // 実際には到達する（またはメモ化で処理される）と仮定する。
                // 実際には、memoizationにより、もし循環が生じても、再帰/反復が終了する前にスタックオーバーフローや時間切れになる。
                // 今回は、一般的なテストケースでは循環が発生しない前提で進める。
                // もし循環が発生したと判断した場合、ここでは安全のため処理を中断し、
                // この問題の制約内では、循環は無視できると見なす。
                // 厳密には、循環の検出は通常、到達可能かどうかをチェックするのに使われる。
                // コナグニセル問題では、必ず1に収束するとされるため、ここでは計算を続行する。
            }
            
            path.add(current); // 現在の数を記録

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps.push(current);
        }

        // 1に到達した後の手数を記録
        const finalSteps = steps.length;

        // 計算過程全体をメモ化する（もし経路が重要であれば）
        // 今回は「nから1までの手数」のみをメモ化する。
        memo.set(n, finalSteps);
        return finalSteps;
    }

    // 全てのクエリを処理する
    for (const n of queries) {
        if (n < 1) continue; // 念のため
        
        const steps = countSteps(n);
        totalCount += steps;
    }

    // 結果を出力
    console.log(`total=${totalCount}`);
}

solve();
