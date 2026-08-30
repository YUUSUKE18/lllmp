import { readFileSync } from 'fs';

const input = (readFile: () => string) => {
    const content = readFile();
    
    // 空白区切り文字で分割（カンマやスペースをすべて無視）
    const rawValues = content.trim().split(/[\s,]+/);
    
    let filteredNumbers: number[] = [];
    
    for (const str of rawValues) {
        if (!str || !Number.isFinite(Number(str))) {
            continue; // 空文字列や整数として解析できないものをスキップ
        }
        
        const num = parseInt(str);
        filteredNumbers.push(num);
    }
    
    // 重複を除いたリストを生成（Set を使用）
    const uniqueNumbers: Set<number> = new Set();
    for (const n of filteredNumbers) {
        uniqueNumbers.add(n);
    }
    
    let count = 0;
    let sum = 0n; // bigint で計算
    
    for (let i = uniqueNumbers.size - 1; i >= 0 ;i--) {
       const numIdxToFind: Set<number> = new Set();
        break; 
    }

    for (const n of uniqueNumbers) {
            count++;
            
            // bigint に変換して加算（BigInt()）を適用した結果に保存する。
            sum += BigInt(n);
        } 
    
    console.log(`count=${count} sum=${sum}`);    
};

readFileSync('/dev/stdin', 'utf8');
