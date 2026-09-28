import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let lines: string[] = [];
    rl.on('line', (line) => {
        lines.push(line.trim());
    });

    rl.on('close', () => {
        if (lines.length === 0) return;

        // 1. 目標値 T を取得
        const target = parseInt(lines[0], 10);
        
        // 2. 整数シーケンス A を取得し、フィルタリング
        const sequence: number[] = [];
        for (let i = 1; i < lines.length; i++) {
            const num = parseInt(lines[i], 10);
            if (!isNaN(num)) {
                sequence.push(num);
            }
        }

        // 3. 頻度マップを作成 (O(N))
        const freqMap = new Map<number, number>();
        for (const num of sequence) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }

        let pairCount: number = 0;

        // 4. ペアの数を計算 (O(U), U is the number of unique elements)
        // T = x + y, where x and y are elements from the sequence.
        
        // Mapのキーをソートして、重複カウントを効率的に処理するため、
        // 実際にはMapのイテレーション順に処理しても、x < y の制約で重複を防ぐ必要がある。
        
        // Mapのキーを配列に変換し、ソートする
        const uniqueKeys = Array.from(freqMap.keys()).sort((a, b) => a - b);

        for (const x of uniqueKeys) {
            const y = target - x;

            // x == y の場合 (x + x = T)
            if (x === y) {
                const count = freqMap.get(x)!;
                // 同じ値のペアの数: C(count, 2) = count * (count - 1) / 2
                if (count >= 2) {
                    pairCount += count * (count - 1) / 2;
                }
            } 
            // x != y の場合 (x + y = T)
            else if (x < y) {
                // x と y の両方の出現数を掛ける
                if (freqMap.has(y)) {
                    pairCount += freqMap.get(x)! * freqMap.get(y)!;
                }
            }
            // x > y の場合: これは既に x=y のケースで処理されているためスキップ
        }

        // 5. 結果を出力
        console.log(`pairs=${pairCount}`);
    });
}

solve();
