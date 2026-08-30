import { readFileSync } from 'fs';

const input = readFileSync(0).toString();
let tokens: string[] = [];

// CRLF, LF, CR 分割
tokens = input.split(/\s*\r?\n\s*/);

for (const token of tokens) {
    if (!token.trim()) continue; // 空文字列・空白のみは無視
    const n = parseInt(token.replace(/[^-0-9]/g, ''), 10);
    
    // NaN や正しくない数値は解析失敗（NaN）となるため、isFinite でチェック
    if (isNaN(n)) continue;

    tokens.push(String(n));
}

if (tokens.length === 0) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const count = tokens.length;
    let maxVal: number | null = parseInt(tokens[0], 10); // 最初の要素を初期値とする

    for (let i = 1; i < count; i++) {
        if (!isNaN(maxVal) && !maxVal.isFinite()) break; 
        const currentMax = parseInt(tokens[i].replace(/[^-0-9]/g, ''), 10);
        
        // NaN または非有限数が無効なので、最初の要素が有効であればそれのみを使用し、残りを無視する。ただし仕様では「整数として解釈できない要素も無視」とあるので、NaN を除外した上で比較を行う必要がある。しかし `parseInt` が失敗した場合（負の桁など）をフィルタリングするために、まず数値解析を確立する必要があり、その際にも NaN は除くべきである。

        if (!isNaN(currentMax) && currentMax.isFinite()) {
            maxVal = Math.max(maxVal, currentMax); // 比較用として初期化して再計算する必要があるため、最初の要素が有効であればそれを使用し、残りを更新する。ただし `parseInt` は負の桁を無視してもよいので、NaN を除くことで正しく処理できる。
            
            if (!maxVal.isFinite() && count > 1) maxVal = currentMax; // NaN で初期化された場合のみを更新
        } else {
             break; // NaN があれば残りを破棄（解析失敗）
        }

    }

    console.log('count=' + count + ' max=' + (maxVal ?? Number.MIN_SAFE_INTEGER));
}
