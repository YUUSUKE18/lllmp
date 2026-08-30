const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (input === "") {
        console.log("total=0");
        return;
    }

    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // 最初の行をNとして扱う
    let n = parseInt(lines[0], 10);
    if (isNaN(n)) {
        // 最初の行が整数でない場合は、処理を終了
        console.log("total=0");
        return;
    }

    // メモ化のためのマップ
    const memo = new Map<number, number>();
    memo.set(1, 0);

    let total_steps = 0;

    // Nが1に到達するまでの手数を計算する関数（メモ化付き）
    function calculate_steps(start_n: number): number {
        if (start_n === 1) {
            return 0;
        }
        if (memo.has(start_n)) {
            return memo.get(start_n)!;
        }

        let current_n = start_n;
        let steps = 0;
        const path: number[] = [];

        while (current_n !== 1) {
            if (current_n <= 0) {
                // 0や負の値は通常問題設定では発生しないが、念のため
                break;
            }
            
            if (current_n % 2 === 0) {
                current_n = current_n / 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
            path.push(current_n);
        }

        // 経路上のすべての値のステップ数を計算し、メモ化する
        // 逆順に計算して、各ステップが1になるまでの距離を計算する
        for (let i = path.length - 1; i >= 0; i--) {
            const val = path[i];
            if (!memo.has(val)) {
                // 逆算：valから次の値への遷移が1ステップであるため、
                // valのステップ数は、next_valのステップ数 + 1
                const next_val = (i === 0) ? 1 : path[i-1]; // これは不正確。実際には、逆操作を考えるべき。
                
                // 直接、start_nから1までの経路を辿り、各ステップを記録してメモ化するのが最も安全。
                // ここでは、start_nから1までの経路を辿る際に、各値が1に到達するまでのステップ数を計算する。
                // しかし、問題の意図は「nから1に到達するまでの操作の回数」なので、
                // スタート地点から1に到達するまでのパスの長さを求める。
                
                // 既に計算された経路を元に、現在の値までのステップ数を計算する
                const temp_steps = 0;
                let temp_n = start_n;
                while (temp_n !== val) {
                    if (temp_n === 1) break;
                    if (temp_n % 2 === 0) {
                        temp_n /= 2;
                    } else {
                        temp_n = 3 * temp_n + 1;
                    }
                    temp_steps++;
                }
                
                if (temp_n === val) {
                    memo.set(val, temp_steps);
                }
            }
        }

        // 最初に計算した開始地点からのステップ数を格納
        memo.set(start_n, steps);
        return steps;
    }

    // すべての行を処理する
    for (let i = 1; i < lines.length; i++) {
        const current_n = parseInt(lines[i], 10);
        if (isNaN(current_n)) continue;

        if (current_n === 1) {
            total_steps += 0;
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(current_n)) {
            total_steps += memo.get(current_n)!;
        } else {
            // メモ化されていない場合は計算（この問題は通常、nから1への経路を問うため、
            // 逆の操作（Collatzプロセスの逆）を考えるか、単純に順方向に計算する）
            // ここでは、nから1に到達するまでのステップ数を求めるため、順方向に計算する。
            
            let steps = 0;
            let temp_n = current_n;
            
            // 逆操作を考える代わりに、nから1へのパスを辿る
            const path: number[] = [current_n];
            let visited = new Set([current_n]);

            // nから1に到達するまでのステップ数を計算
            while (temp_n !== 1) {
                if (temp_n % 2 === 0) {
                    temp_n /= 2;
                } else {
                    temp_n = 3 * temp_n + 1;
                }
                steps++;
                
                if (temp_n <= 0) break; // 安全策
                
                path.push(temp_n);
            }

            if (temp_n === 1) {
                // 経路上の各値のステップ数を計算し、メモ化する
                // これは、問題が「nから1に到達するまでの操作の回数」を求めているため、
                // nをスタートとして、その経路長を求める。
                
                // 既に計算された経路を元に、各ステップを記録し、メモ化する
                // この問題設定では、各クエリnについて、nから1への操作回数を求める必要がある。
                
                // 順方向の計算で、現在のnから1までのステップ数を求める
                let current_steps = 0;
                let temp = current_n;
                while (temp !== 1) {
                    if (temp % 2 === 0) {
                        temp /= 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    current_steps++;
                }
                
                total_steps += current_steps;
                memo.set(current_n, current_steps);

            } else {
                 // 1に到達できなかった場合（理論上は発生しないが）
                 // 何もしない
            }
        }
    }

    // 最終結果の出力
    console.log(`total=${total_steps}`);
}

solve();
