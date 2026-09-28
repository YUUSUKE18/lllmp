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

    // 最初の行がクエリの数（または最初の数）であると仮定し、残りをクエリとして扱う
    // 仕様に基づくと「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」なので、
    // 各行が個別のクエリ n であると解釈します。
    
    let total_steps = 0n;
    const memo = new Map<number, bigint>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // nが1のときの手数は0
            continue;
        }

        // メモ化された値があればそれを使用
        if (memo.has(n)) {
            total_steps += memo.get(n);
            continue;
        }

        // 再帰的計算とメモ化
        let steps = 0n;
        let current_n = n;
        const path = new Set<number>(); // サイクル検出用

        while (current_n !== 1) {
            if (path.has(current_n)) {
                // サイクル検出。この問題では1に到達する経路が必ず存在するため、
                // サイクルに陥った場合は、そのサイクル内の移動回数を考慮する必要があるが、
                // 1に到達する問題なので、通常はサイクルは発生しない（または1に到達する）と仮定する。
                // サイクルが発生した場合、そのサイクル内の移動回数を加算して、
                // 1に到達するまでのステップ数を計算する必要がある。
                // ただし、この問題はCollatz予想に関連しており、1に収束することが期待される。
                // サイクル検出は、計算が無限に続くことを防ぐための安全策。
                // ここでは、サイクルに陥った場合は、その経路を終了させる（またはエラーとするが、ここでは無視する）。
                // 実際には、Collatz数列は必ず1に収束すると予想されているため、この分岐は理論上不要かもしれない。
                // 安全のため、ここではサイクル検出を厳密に行う。
                // サイクルに陥った場合、その経路は1に到達しないため、計算を停止する。
                // ただし、問題の制約上、これは発生しないと仮定する。
                break; 
            }
            path.add(current_n);

            if (current_n % 2 === 0) {
                current_n /= 2;
            } else {
                current_n = 3 * current_n + 1;
            }
            steps++;
        }

        // 1に到達したか確認
        if (current_n === 1) {
            // 1に到達したときのステップ数は、ループ内でカウントした steps に 1 を加える必要がある。
            // ループは n から始まるため、n=4 -> 2 -> 1 の場合、2回の操作で1に到達。
            // n=4: 4 -> 2 (1回) -> 1 (2回)。steps=2。
            // n=1: 0回。
            // n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)。
            // ループ内で current_n が 1 になった時点でループを抜ける。
            // 1に到達するまでの操作回数を正しくカウントするため、
            // 1に到達するまでの操作回数を steps に加算する。
            
            // 最初のnからスタートし、nが1になるまでの操作回数を数える。
            // n=1の場合、steps=0。
            // n=4: 4->2 (steps=1), 2->1 (steps=2)。
            // 1に到達した時点で、stepsがその回数になっている。
            
            memo.set(n, steps);
            total_steps += steps;
        } else {
            // サイクルに陥った、または1に到達しなかった場合（理論上は発生しないはず）
            // この場合、計算結果を無視するか、エラー処理を行うが、ここでは仕様に従い、
            // 1に到達しない場合はそのクエリを無視する（または、問題の前提が崩れていると見なす）。
            // Collatz数列の性質上、これは発生しないと仮定する。
        }
    }

    console.log(`total=${total_steps.toString()}`);
}

solve();
