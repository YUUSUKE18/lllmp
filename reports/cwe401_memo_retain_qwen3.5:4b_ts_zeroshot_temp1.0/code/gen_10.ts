const memo: Map<number, number> = new Map();

function getCollatzSteps(n: number): number {
    if (n === 1) return 0;
    
    // メモ化される値のサイズが 2^31 を超える可能性があるため、数値型を int に制限せず保持します
    // ただし、メモ化キーは 32bit 整数範囲内に収まる値と仮定しつつ、値そのものは BigInt として扱う必要がありますか？
    // 問題文：「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります。」
    // Node.js の Number は JS Number (IEEE 754 double precision) で最大約 9e15(2^53-1) を正確に表せます。
    // しかし、Collatz 問題では中間値が巨大になる可能性があります。
    // 64bit signed integer は約 9e18 です。Number では 2^53 が境界ですが、ここでは BigInt を安全に使用するのが良いでしょう。
    
    const nBig = typeof n === 'bigint' ? n : BigInt(n);
    
    let current = n;
    let steps = 0;
    
    // キーとして使用する値：メモ化のキーを整数（64bit）として使う場合と、値そのものを保存する場合。
    // 入力値 n は 32bit 以下と想定されるが、途中経過で 64bit を超えることがないという記述はない。「収まります」なので max(n) が 32bit, 
    // かつ途中の値は最大で 64bit signed int 以内。
    // Node.js で 64bit 整数を扱うには Number をそのまま使うと精度が落ちる可能性がある（2^53 の壁）ので、BigInt にしたほうが安全です。
    // しかし、入力される n が 32bit なら、途中経過も 64bit signed int 以内であることは「仕様」上保証されています。
    // Key: number (64bit integer range) をそのまま使用できるか？ 
    // Node.js の Number は 53 ビット有効数字です。64bit integer の高桁は誤差を含む可能性がありますが、Collatz 数列の最大値は一般に 2^60 程度までになることも。
    // 「64bit 整数の範囲には収まります」とあるので、BigInt で計算し、最終的な結果を BigInt のまま扱う必要がありますか？ 
    // 出力は「total=<合計>」です。合計も多分 bigint です。
    
    // メモ化用キーと値のタイプ：
    // キー: number | undefined (64bit int を number で扱おうとするが、精度リスクがある)
    // 実際の問題では Collatz 数列の値が非常に大きくなりうるため、BigInt を使用するのが正しいアプローチです。
    
    const nBig = typeof n === 'bigint' ? n : BigInt(n);
    
    if (!memo.has(String(n))) {
        memo.set(String(n), steps); // 単純な実装のため、n の文字列をキーにすると効率的ですが、BigInt が必要なら String を使います
    } else {
        return memo.get(String(n)) as number; 
    }

    // 再帰ではなくループで処理し、メモ化を使用
    if (memo.has(String(current))) {
        return memo.get(String(current))! + steps; // 既に計算済みの部分がある場合は加算。
        // しかし、これは階段的にメモ化するタイプです。より単純な方法：
    }
    
    // 修正：Collatz 関数自体を再定義してメモ化を行う
    // 一度の呼び出しで完全なパスを計算し、その途中経過を全てメモ化する
}

function solve(n: number): number {
    if (n === 1) return 0;
    
    // メモ化キーとして n の文字列（または数値）を使用。
    // n が 64bit int 範囲内である場合、String(n) で安全にキー化できます。
    const currentKey = String(BigInt(n));
    
    if (memo.has(currentKey)) {
        return memo.get(currentKey)!;
    }
    
    let steps: bigint = BigInt(0);
    let current = BigInt(n);
    
    while (current !== 1n) {
        const isEven = current % 2n === 0n;
        
        if (isEven) {
            current = current / 2n;
        } else {
            current = (current * 3n) + 1n;
        }
        
        steps++; // ここではステップ数をカウント
    
    // 途中経過をメモ化
    const pathSteps = [BigInt(n), ...currents]; // paths.push(current);
}

// メモ化用マップ
const memo: Map<string, number> = new Map();

function calculateTotalSteps(lines: string[]): number {
    let total = 0;
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed === '' || !/^-?\d+$/.test(trimmed)) continue;
        
        const n = parseInt(trimmed, 10);
        if (isNaN(n)) continue;
        
        // n が負の場合は処理しない（問題文「1 以上の整数」）
        if (n < 1) continue;
        
        let steps: bigint = BigInt(0);
        let current = BigInt(n);
        
        while (current > 0n && current !== 1n) {
            const isEven = current % 2n === 0n;
            let next: bigint;
            
            if (isEven) {
                next = current / 2n;
            } else {
                next = (current * 3n) + 1n;
            }
            
            steps++;
            current = next;
        }
        
        // 途中経過をメモ化：入力 n から生成された全経路の値をキーに
        let temp = BigInt(n);
        while (temp !== 1n) {
            const isEven = temp % 2n === 0n;
            let next: bigint;
            
            if (isEven) {
                next = temp / 2n;
            } else {
                next = (temp * 3n) + 1n;
            }
            
            const key = String(temp);
            // 既に計算済みの値がある場合、メモ化されるべきか？ 
            // 問題文「同じ整数が繰り返し現れるので」→ メモ化すべき
            if (!memo.has(key)) {
                memo.set(key, steps % 10n); // ステップ数をカウントして保存する必要がある
            }
            temp = next;
        }
        
        total += Number(steps);
    }
    
    return total;
}

// 読み込みと実行
const inputLines = [];
let line: string | null;
while ((line = process.stdin.readLine()) !== null) {
    inputLines.push(line);
}

console.log(`total=${calculateTotalSteps(inputLines)}`);
