process.stdin.setEncoding("utf8");

let data = "";
process.stdin.on("data", (chunk: string) => {
    data += chunk;
});

process.stdin.on("end", () => {
    const lines = data.trim().split(/\s+/).filter(line => line.length > 0);

    if (lines.length === 0) {
        console.log("total=0");
        return;
    }

    // 各行を整数としてパース
    const initialNumbers = lines.map(Number);

    if (initialNumbers.some(isNaN)) {
        // 整数として解釈できない行は無視
        const validNumbers = initialNumbers.filter(n => !isNaN(n));
        if (validNumbers.length === 0) {
            console.log("total=0");
            return;
        }
        // 整数として解釈できたもののみを処理対象とする
        const numbersToProcess = validNumbers;
        
        // メモ化テーブル
        const memo = new Map<number, number>();
        let totalCount = 0;

        for (const n of numbersToProcess) {
            if (n === 1) {
                totalCount += 0;
            } else if (!memo.has(n)) {
                // メモ化されていない場合、再帰的に計算し、結果を保存
                let count = 0;
                let current = n;
                let steps = 0;
                while (current !== 1) {
                    if (current % 2 === 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                memo.set(n, steps);
            } else {
                // メモ化されている場合、結果を使用
                totalCount += memo.get(n)!;
            }
        }

        console.log(`total=${totalCount}`);
        return;
    }


    // 整数としてパースできた場合の処理（最初の例に従い、ここでは入力が1行に1個ずつという指示に従い、各数に対して計算を行う）
    // 仕様「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」を解釈し、読み込んだ数全てに対して計算を行う。
    
    const memo = new Map<number, number>();
    let totalCount = 0;

    for (const n of initialNumbers) {
        if (isNaN(n) || n < 1) continue; // 1以上の整数でないものは無視

        if (n === 1) {
            totalCount += 0;
            continue;
        }

        if (!memo.has(n)) {
            // メモ化されていない場合、計算とメモ化
            let count = 0;
            let current = n;
            
            // 繰り返し操作（手数の計算）
            while (current !== 1) {
                if (current % 2 === 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
                count++;
            }
            memo.set(n, count);
        } else {
            // メモ化されている場合、結果を使用
            totalCount += memo.get(n)!;
        }
    }

    console.log(`total=${totalCount}`);
});
