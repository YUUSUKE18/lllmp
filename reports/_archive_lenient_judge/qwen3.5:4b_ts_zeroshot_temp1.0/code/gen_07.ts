const input = process.stdin.read();
let lines: string[] = [];
if (input) {
    const tokens = input.split(/\s+/).filter(t => t.trim() !== '');
    
    if (!tokens.length) {
        console.log("count=0 sum=");
        return;
    }

    for (const token of tokens) {
        if (token.match(/^-?\d+$/)) {
            lines.push(Number(token));
        } else {
            // 非数値要素はスキップします（仕様通り：「整数として解釈できない要素も無視する」）
        }
    }

    const uniqueNumbers = new Set(lines);
    
    let count = uniqueNumbers.size;
    let sum: number = lines.reduce((acc, val) => acc + Number(val), 0); // Set は重複除去済みなので、配列への再転換せずに各要素の合計を求めます。

    console.log(`count=${count} sum=${sum}`);
} else {
    console.log("count=0 sum=");
}
