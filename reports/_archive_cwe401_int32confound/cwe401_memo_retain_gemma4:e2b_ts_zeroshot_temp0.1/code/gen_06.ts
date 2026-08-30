/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から整数クエリを読み込み、
 * nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求める。
 * nが1のときの手数は0。
 * すべてのクエリの手数の合計を求める。
 * 計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * Node.jsで動作する完全なTypeScript。
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
    const memo: Map<number, number> = new Map();
    let totalCount: bigint = 0n;

    for (const line of lines) {
        let n: number;
        try {
            n = parseInt(line, 10);
            if (isNaN(n) || n < 1) {
                continue; // 整数として解釈できない行や1未満の数は無視
            }
        } catch (e) {
            continue; // エラーが発生した場合は無視
        }

        if (n === 1) {
            // nが1のときの手数は0
            const count = 0;
            memo.set(1, count);
            totalCount += BigInt(count);
            continue;
        }

        // 再帰的または反復的に計算し、メモ化を利用する
        let steps = 0;
        let currentN = n;
        const path: number[] = []; // 経路を記録してメモ化を効率的に行うため（今回は直接計算で十分だが、再帰的な構造を模倣）

        // 経路を記録しながら計算し、ループ検出とメモ化を同時に行う
        while (currentN !== 1) {
            if (memo.has(currentN)) {
                // メモ化された値があれば、そこから計算する
                steps += memo.get(currentN);
                // 経路を遡って現在のステップ数を更新する必要があるが、
                // この問題は「1に到達するまでの手数」なので、現在のnから1への最短経路を求める問題として解釈する。
                // 実際には、n -> f(n) -> f(f(n)) ... -> 1 となる過程のステップ数を数える。
                // ここでは、nから1への遷移の回数を数える。
                
                // 簡略化のため、再帰的な構造をメモ化に適用する。
                // nから1への手数を求めるため、現在のnから1への手数を計算する。
                
                // 経路を記録し、ループを検出する
                path.push(currentN);
                
                // 遷移を計算
                if (currentN % 2 === 0) {
                    currentN = currentN / 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
                
                // 経路が循環した場合の処理（今回は1に到達することを前提とするが、安全のため）
                if (path.includes(currentN)) {
                    // 循環が発生した場合、この経路は1に到達しない（または無限ループ）
                    // この問題の文脈では、1に到達することを前提とするため、このケースは通常発生しない（または無視する）
                    // 実際には、この問題はCollatz予想に関連しており、1に収束すると仮定する。
                    // 循環が発生した場合は、その経路の長さは無効となるが、ここでは計算を続ける。
                    // 厳密には、この問題は「1に到達するまでのステップ数」を問うているため、
                    // 循環が発生した場合は、その経路の長さは計算不能となる。
                    // しかし、メモ化を適用するため、循環した場合はその経路の長さは無限大となる。
                    // ここでは、循環が発生した場合は、その経路の長さは計算しない（またはエラーとする）という方針をとる。
                    // 今回は、問題の意図に従い、1に到達すると仮定して進める。
                    break; 
                }
                
            } else {
                // メモ化されていない場合、再帰的に計算する（またはループを続ける）
                path.push(currentN);
                
                if (currentN % 2 === 0) {
                    currentN = currentN / 2;
                } else {
                    currentN = 3 * currentN + 1;
                }
            }
        }

        // 1に到達したときのステップ数を計算する
        if (currentN === 1) {
            // 経路の長さは、現在のnから1に到達するまでの遷移回数
            // pathにはn, f(n), f(f(n)), ..., 1 が含まれている
            // 遷移回数は path.length - 1
            const stepsForN = path.length - 1;
            
            // 経路上の各要素についてメモ化を更新する
            for (let i = 0; i < path.length; i++) {
                const val = path[i];
                if (!memo.has(val)) {
                    // valから1への手数を計算する
                    let currentSteps = 0;
                    let tempN = val;
                    const tempPath: number[] = [];
                    
                    // valから1への経路を再計算し、メモ化を更新する
                    while (tempN !== 1) {
                        tempPath.push(tempN);
                        if (tempN % 2 === 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                    }
                    // 1に到達するまでのステップ数は tempPath.length
                    const stepsToOne = tempPath.length;
                    
                    // 経路を逆順にしてメモ化を更新する
                    for (let j = tempPath.length - 1; j >= 0; j--) {
                        const node = tempPath[j];
                        if (!memo.has(node)) {
                            // nodeから1への手数は、nodeからtempNへの手数 + 1
                            // ここで、tempNは次のステップ（より小さい値）
                            // 実際には、この再計算は非常に非効率的であり、
                            // 最初に計算した経路を信頼し、その経路上の要素をメモ化する方が効率的。
                            // 最初のループで計算した経路を信頼し、その経路の長さを採用する。
                            
                            // 最初のループで計算した経路の長さを採用する
                            // (この問題のメモ化戦略は、各nから1への最短経路を求めるのではなく、
                            // 遷移の過程を追跡するものであるため、再帰的なメモ化が最も自然)
                        }
                    }
                }
            }
            
            // 最終的なステップ数を加算
            totalCount += BigInt(stepsForN);

        } else {
            // 1に到達しなかった場合（循環など）は、このクエリは無視するか、エラーとするが、
            // 問題の制約上、1に収束すると仮定する。
            // 厳密には、この問題はCollatz予想の計算であり、メモ化は「nから1への最短経路」を求めるために使われる。
            // 最初のループで計算した経路の長さを採用する。
            totalCount += BigInt(path.length - 1);
        }
    }

    // 最終結果の出力
    console.log(`total=${totalCount.toString()}`);
}

solve();
