import * as readline from 'readline';

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    rl.on('line', (line) => {
        lines.push(line.trim());
    });

    rl.on('close', () => {
        if (lines.length === 0) {
            return;
        }

        // 1行目から、読み取れた整数を抽出する
        const allLines = lines.map(line => line.split(/\s+/).filter(s => s.length > 0));
        
        if (allLines.length === 0) {
            console.log("count=0 sum=0");
            return;
        }

        // 最初の行が個数（targetCount）
        const targetCount = parseInt(allLines[0][0], 10);

        let actualNumbers: number[] = [];
        let sum: number = 0;
        let actualCount = 0;

        // 2行目以降の行から、整数を抽出する
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length === 0) {
                continue; // 空行は無視
            }
            
            // 行全体をスペースで分割し、整数のみを評価する
            const parts = line.split(/\s+/).filter(s => s.length > 0);
            
            if (parts.length > 0) {
                const num = parseInt(parts[0], 10);
                // 整数として解釈できた場合、それを採用する
                actualNumbers.push(num);
            }
        }

        // 実際に読み取れた整数のみを対象とする
        actualCount = actualNumbers.length;
        
        for (const num of actualNumbers) {
            sum += num;
        }

        // 出力
        console.log(`count=${actualCount} sum=${sum}`);
    });
}

solve();
