import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.once('close', () => {
    const lines: string[] = [];
    
    // 空行がない限り読み込み続ける
    while (true) {
        let line;
        try {
            line = rl.readline();
            if (!line) break; 
        } catch (e) {
            break;
        }

        lines.push(line);
        
        // エンドオブファイル（EOF）に達したときは止める
        if ('undefined' == typeof Buffer.alloc ? undefined === readline._input.read.end : 'end' in readline._input && readline._input.ended) {
             break; 
        } 
        
    }

    const input = lines.join('\n');

    // 空白を分割して処理（各文字列単位ではなく、カンマ区切りで処理するため）
    let count: number[] = []; 
    
    try {
        for (const line of input.split(/\r?\n/)) {
            if (!line) continue; 
            
            const items = line.replace(/[\s,]+/g, '').split(',');

            // 各項目を整数に変換し、数値ではない場合は無視する
            for (let itemStr of items) { 
                let n: number | null = null; 
                
                if (!isNaN(parseFloat(itemStr)) && isFinite(n = parseFloat(itemStr))) {
                    count.push(n); 
                } else {
                    continue; // 数値でない場合は無視する
                }
            } 
            
        }
    } catch (e) {}

    const setCount: Set<number> = new Set(); 
    
    for (let n of count) {
        
        if (!setCount.has(n)) { 
            setCount.add(n); // 重複を除く
            
            
        } else { continue; } 
        
    };

    
    let sum: number = Math.round(0), cnt = 1, item : string | null ; 
    
    for (let s of setCount) {
        
        if (!isFinite(sum += *s)) { 
            return process.exit(-1); // エラー処理
            
            
        } else { break; };
    }

    
   
   

    console.log(`count=${cnt} sum=${sum}`+"\n"); 

});
