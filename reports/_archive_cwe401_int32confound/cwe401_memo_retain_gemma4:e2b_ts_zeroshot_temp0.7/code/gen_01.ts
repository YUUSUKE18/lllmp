/**
 * 仕様を満たすプログラム
 * 
 * 仕様:
 * 標準入力から与えられた整数 n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
 * n=1 のときの手数は 0。
 * すべてのクエリの手数の合計を求める。
 * 同じ整数が繰り返し現れるので、計算結果をメモ化して高速化する。
 * 標準出力へ `total=<合計>` を出力する。
 * 
 * 言語・形式: Node.js で動く完全な TypeScript。
 * 
 * 実行環境: 標準入力から整数クエリを読み込む。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').filter(line => line.trim() !== "");

    // メモ化テーブル (Map: n -> 手数)
    const memo = new Map<number, number>();
    let totalCount = 0;

    for (const line of lines) {
        const n = parseInt(line.trim(), 10);

        if (isNaN(n) || n < 1) {
            continue; // 整数として解釈できない行や1未満の値を無視
        }

        if (n === 1) {
            memo.set(1, 0);
        } else if (!memo.has(n)) {
            // 再帰または反復計算で手数を計算
            let steps = 0;
            let current = n;
            const history = new Set<number>(); // サイクル検出用

            while (current !== 1) {
                if (current === 0) {
                    // 0に到達した場合、通常は無限ループまたはエラーだが、この問題の文脈では1に到達すると仮定する。
                    // しかし、3n+1操作では1から0への道は存在しない。
                    // 1に到達する問題なので、ここでは到達不可と見なすか、またはサイクル検出で対応する。
                    // サイクル検出を行っているため、ここで無限ループを避けるために、もしサイクルに入ったら処理を停止する。
                    break; 
                }
                
                if (history.has(current)) {
                    // サイクル検出：1に到達しない場合、サイクルに入った場合は、その経路は1に到達しない（または無限に続く）
                    // この問題は1に到達することを前提としているため、サイクルは通常発生しない（または1に到達する経路に組み込まれる）
                    // ここでは、もしサイクルに入ったら、その経路は1に到達しないと見なす（ただし、この問題の性質上、これは起こらないはず）
                    break;
                }
                
                history.add(current);

                if (current % 2 === 0) {
                    current = current / 2;
                } else {
                    current = 3 * current + 1;
                }
                steps++;
            }
            
            // 計算結果をメモ化（サイクル検出が成功していれば、到達した値の手数を記録する）
            // 厳密には、サイクル検出が成功した場合は、そのサイクル内の値は計算を再開しない。
            // 今回は、1に到達したと仮定してステップ数を記録する。
            if (current === 1 || memo.has(current)) {
                 // 1に到達したか、既に計算済みの値に到達した場合
                 let currentSteps = 0;
                 let temp = n;
                 while (temp !== 1) {
                     if (temp === 1) break; // 1に到達
                     if (memo.has(temp)) {
                         // 既に計算済みの値に到達した場合
                         currentSteps += memo.get(temp);
                         break;
                     }
                     
                     if (temp % 2 === 0) {
                         temp = temp / 2;
                     } else {
                         temp = 3 * temp + 1;
                     }
                     currentSteps++;
                 }
                 
                 if (temp === 1) {
                     memo.set(n, currentSteps);
                 }
            }
            // サイクル検出でループを抜けた場合は、memoには登録しない（1に到達しなかったため）

        } else {
            // メモ化された値を使用
            totalCount += memo.get(n)!;
        }
    }

    // 最終的な合計を出力
    console.log(`total=${totalCount}`);
}

solve();
