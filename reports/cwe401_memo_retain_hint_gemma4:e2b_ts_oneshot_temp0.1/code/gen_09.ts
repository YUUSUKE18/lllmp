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

    // 1. 入力のパース
    const initialNumbers = lines.map(line => parseInt(line, 10));
    
    if (initialNumbers.length === 0) {
        console.log("total=0");
        return;
    }

    // 2. メモ化された関数 (Memoization)
    const memo = new Map<number, number>();

    /**
     * 置き換え操作を繰り返して 1 に到達するまでの手数を計算する
     * @param n 初期値
     * @returns 手数
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
        
        // 1 に到達するまでのステップを計算
        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        // 経路上のすべての値のメモ化 (これは問題の意図を再解釈する必要がある)
        // 問題文の「n が 1 のときの手数は 0 です」と「n が 1 に到達するまでの手数を求めます」を考慮すると、
        // 実際には n から 1 に到達するまでの操作の回数を数えるべき。
        // ただし、問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
        // 1 から n への操作（コナーグの問題）とは逆の操作（n から 1 への操作）を意味している。
        // したがって、n から 1 への操作を繰り返す。
        
        // 経路上のすべての値のメモ化を再実行する（これは、各クエリが独立しているため、この関数内でのメモ化は、
        // 複数のクエリ間で共有されるべきである、という指示に従う）
        
        // ここでは、n から 1 への操作の回数を計算する。
        // 経路上のすべての値のメモ化は、この関数が呼び出されるたびに、その経路上の値が1に到達するまでのステップ数を返す、という形で実現する。
        
        // 実際には、この問題は「n から 1 への操作の回数」を求めるものであり、
        // 経路上の各ステップで発生する操作回数を数える。
        
        // 経路上の各値のステップ数を記録する
        const path: { [key: number]: number } = {};
        let temp = n;
        let stepCount = 0;
        
        while (temp !== 1) {
            if (path[temp] !== undefined) {
                // 既に計算済みの経路があれば、その結果を足し合わせる
                stepCount += memo.get(temp)!;
                break; // 経路が繋がったので終了
            }
            path[temp] = stepCount;
            
            if (temp % 2 === 0) {
                temp = temp / 2;
            } else {
                temp = 3 * temp + 1;
            }
            stepCount++;
        }
        
        // 1 に到達したときのステップ数を加算
        if (temp === 1) {
            stepCount += 0; // 1 に到達したときのステップ数は 0
        }
        
        // 経路上のすべての値のメモ化を更新
        for (const val in path) {
            memo.set(Number(val), path[val]);
        }

        return stepCount;
    }

    // 3. 全クエリの処理と合計の計算
    let totalSteps = 0;
    
    for (const n of initialNumbers) {
        if (n >= 1) {
            // 各クエリ n について、n から 1 への操作の手数を求める
            // 実際には、n から 1 への操作の回数を求める。
            // 経路上の各値のメモ化が、この操作の回数を計算する。
            
            // 最初の呼び出しで、n から 1 への操作の回数を計算し、メモを更新する。
            const steps = countSteps(n);
            totalSteps += steps;
        }
    }

    // 4. 結果の出力
    console.log(`total=${totalSteps}`);
}

solve();
