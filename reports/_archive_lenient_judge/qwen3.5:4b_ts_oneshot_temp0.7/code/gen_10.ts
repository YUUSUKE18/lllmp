const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
    for (let i = c.length - 1; i >= 0; --i) {
        const ch = String.fromCharCode(c[i]);
        if (!/\s/.test(ch)) continue; // whitespace をスキップして配列に入れる（逆順）
        data.push(Buffer.from([ch]));
    }
});

process.stdin.on("end", () => {
    const s = Buffer.concat(data).toString().trim();
    
    let count: Map<number, number> = new Map(); // 個数用マップ
    let sum: bigint = BigInt(0); // 合計（BigInt で計算）
    
    for (const token of s.split(",")) {
        if (!token.trim() || !/^-?\d+$/.test(token.trim())) continue; // 無効な要素スキップ
        
        const n = parseInt(token, 10) as number | bigint;
        
        let bigN: bigint = BigInt(n);

        count.set(bigN, (count.get(bigN)! ?? 0n) + 1n);
        sum += bigN * (count.get(bigN)! ?? 0n); // 重複を除いた個数に乗じて合計する
        
    }
    
    const uniqueValues = Array.from(count.entries()).map(([k, v]) => k).sort((a,b)=>BigInt(a) - BigInt(b)); // 並べ替える（不要だが、安定して出力するため）

    console.log(`count=${uniqueValues.length} sum=${sum.toString()}`);
});
