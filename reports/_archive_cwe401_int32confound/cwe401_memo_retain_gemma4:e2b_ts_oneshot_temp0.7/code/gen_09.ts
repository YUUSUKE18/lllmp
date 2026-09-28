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

    // メモ化用のマップ
    const memo = new Map<number, number>();
    let total_steps = 0;

    // 各クエリを処理
    for (const line of lines) {
        let n: number;
        const num = parseInt(line, 10);

        if (isNaN(num) || num < 1) {
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(num)) {
            total_steps += memo.get(num);
            continue;
        }

        // 1に到達するまでの手数を計算
        let current_n = num;
        let steps = 0;

        while (current_n !== 1) {
            if (memo.has(current_n)) {
                // 途中でメモ化された値に到達した場合、残りのステップ数を加算
                steps += memo.get(current_n);
                break;
            }

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        // 1に到達したときのステップ数を記録（再帰的な計算を避けるため、この問題では直接的な経路を追う）
        // ただし、この問題は「1に到達するまでの手数」を求めているため、標準的なCollatzの経路を追うのが正しい。
        // ここでは、nから1への経路を辿り、その経路の長さを数える。
        
        // 再計算：メモ化された値がない場合、純粋に経路を辿ってステップ数を計算する。
        // ただし、この問題は「nが1になるまでの手数」を求めるので、
        // 既に求めたメモ化値を再利用する形で実装する。
        
        // 再度、メモ化をより適切に行うために、再帰的または反復的に計算する。
        
        // 簡略化のため、ここでは「nから1までのパス」を計算し、その結果をメモする。
        
        let path_steps = 0;
        let temp_n = num;
        const path = [];
        
        // 経路を追跡し、循環や再訪をチェックしながら進む
        const visited = new Set<number>();
        let current_path_n = num;
        
        while (current_path_n !== 1 && !visited.has(current_path_n)) {
            if (memo.has(current_path_n)) {
                // 既に計算済みの部分があれば、そこから計算を終了する
                const memo_steps = memo.get(current_path_n);
                path_steps += memo_steps;
                break;
            }
            
            visited.add(current_path_n);
            path.push(current_path_n);

            if (current_path_n % 2 === 0) {
                current_path_n /= 2;
            } else {
                current_path_n = 3 * current_path_n + 1;
            }
            path_steps++;
        }
        
        // 経路を辿って得られた情報をメモに追加
        if (current_path_n === 1) {
            // 1に到達したときの総ステップ数を記録する
            const final_steps = path_steps;
            memo.set(num, final_steps);
            total_steps += final_steps;
        } else if (visited.has(current_path_n)) {
            // 循環に陥った場合、循環内のステップ数を計算し、それをメモする
            // (この問題の制約上、通常は1に到達するが、念のため)
            // ここでは、memo化が成功したパスのみを合計する方針を採用し、未解決のものは無視するか、
            // 循環を検出した時点で、そのパスの合計を計算する。
            // Collatzの一般的な問題では、1に到達する保証があるため、ここでは単純に1に到達したパスのみを合計する。
            // 循環を検出した場合、その値は無視する（問題の意図に従う）。
        }
    }

    // 最終的な合計を出力
    console.log(`total=${total_steps}`);
}

solve();
