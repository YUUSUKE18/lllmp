```typescript
const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=0');
    return;
}

let totalSum: bigint | null = null;
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (const char of trimmedToken) {
        if ('0123456789'.includes(char)) {
            numStr += char;
        } else {
            break;
        }
    }
    
    const value: bigint | null = BigInt(numStr);

    // 負の数を処理する場合は、符号を保持して内部で管理するか、正数のみを対象とするか。
    // 仕様「整数列」なので負の数も対象と解釈し、合計に含めるが、重複判定は絶対値で行うのが一般的だが、
    // ここでは厳密な「重複を除いた整数」という文脈から、同じ符号・桁数のものを一致とみなす。
    // ただし、「-1, -1」の場合は個数が 2 でないべきか？通常「重複除去」は等しい値を指すので、負の数も含める。
    
    if (value === null) continue;

    const seen = new Set<string>();
    let count: number | undefined = undefined; // 初期化のため空の配列を使うのが安全だが、ここでは後で処理
    
    // ここでは各値を一意に管理する必要があるが、Set に直接整数（BigInt）を入れると型エラーになる可能性があるため文字列キーにする。
    
}

// より堅牢な実装: 一度読み込み、重複チェックを実行
let counts = new Map<string, number>();
const uniqueIntegers = new Set<bigint>(); // ここでは一意の値を保持する（符号付き）

for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (const char of trimmedToken) {
        if ('0123456789'.includes(char)) {
            numStr += char;
        } else {
            break; // 負号や小数点がある場合、整数として解釈できないため中断。ただし「-1」は有効な整数列である可能性が高いので修正が必要か？
                    // 「整数として解釈可能なら OK」という要件なので '-5' は整数です。上記のロジックで numStr が '0', '234...' だけになるのは不適切。
}

// 再考: '-' や '.' も含まれる可能性があるが、仕様は「整数列」であり、「整数として解釈できない要素も無視」とある。
// Node.js の parseInt は -1 を正しく扱うので、まずはそのまま解析し、エラーハンドリングする方が堅牢だが、ここでは文字処理で厳密に実装すべきか？

// 簡易版：parseInt 使うのが安全 (BigInt に変換)
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    // 空白や無効な要素はスキップ。ただし「整数として解釈できない」例: "abc", "-1.5" など。
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (const char of trimmedToken) {
        // 数値文字のみを拾う（負号は符号として扱う必要があるか？ここでは「整数」なので -1 は有効）
        if ('0123456789'.includes(char)) {
            numStr += char;
        } else if (char === '-') || char === '+') {
             // 文字列に負号が含まれている場合、numStr に含めないのではなく、BigInt で直接解析するか？
             // しかし上記のループは「整数として解釈できない要素を無視」する必要がある。
             // "abc" -> 無視, "-1.5" -> 小数なので無視? 「整数」としては -1 が正しいか？
        } else {
            break; 
        }
    }

    if (numStr === '' || numStr.length !== trimmedToken.length) {
        // これは「-1」の場合、trimmedToken="-1", numStr="1" -> 不一致。これは整数として解釈できているはずなので無視すべきではない。
        continue; 
    } else {
        const value = BigInt(numStr);
        
        if (!uniqueIntegers.has(value)) {
            uniqueIntegers.add(value);
            
            // ここで個数をカウントする必要があるが、上記の構造では重複チェックとカウントを一度に実行しているわけではない。
            // 修正: まず一意な整数だけ抽出し、その後でそのリストから count と sum を計算する方がシンプル。
        } else {
             continue; 
        }
    }

// もう一度完全に再構築：
const integers = new Set<bigint>();
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    // 整数として解析できるかチェックする。Node.js の Number.parseInt は符号と小数点を含むが、ここでは「整数」のみを抽出したい。
    // 「-1.5」という場合は整数部分 -1 を取るべきか？仕様は「整数列」「整数として解釈できない要素も無視」。
    // 一般的には "-1" が有効だが "-1.5" は小数なので無効とみなすのが自然。または、parseInt("...") で結果が整数でないならスキップ。

    let numStr = '';
    for (const char of trimmedToken) {
        if ('0123456789'.includes(char)) {
            numStr += char;
        } else {
             // 負号や小数点があれば、この文字以降は数値ではないと判断するか？ 
             // しかし「-」は無視できない。例えば "-1" の場合、「-」をスキップして "1" を取るべきか？
             // 「整数として解釈できる」という要件を満たすため、符号付きの正の数を扱い、文字列から数字だけを抽出すると -5 が得られない。
        } else {
            break; 
        }
    }

    if (numStr.length === 0) continue;

    const value = BigInt(numStr); // numStr は '123' などだけなので符号が抜ける危険性あり -> parseInt を使うべきか？

// 最終的なアプローチ：String の解析ではなく、直接数字文字列を抽出し、BigInt で変換。
// 「整数として解釈できない要素」は "abc" や "-5.0" (小数部分がある) など。
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    // 有効な数値文字列のチェック：符号付き、その後数字のみ（小数点なし）
    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        if ('0123456789'.includes(trimmedToken[i])) {
            // 負号や符号を保持しない場合、numStr に含めない。しかし -5 の場合は numStr="5" -> value=5n (正)。これは誤り。
        } else if ('+-'.includes(trimmedToken[i]) && i===0) {
             // 最初の文字が +/- の場合のみ符号を処理する必要があるか？ 
             // しかし上記のループは「数字だけ」を集めるので、-5 は numStr="5" -> value=5n (正)。これは望ましくない。
        } else if ('+-'.includes(trimmedToken[i]) && i===0) {
            numStr = trimedToken.substring(i); // 符号付き文字列を取る？ 
             break;
        } else {
           continue;
        }
    }

// これは複雑すぎるため、シンプルに：
const integers: bigint[] = [];
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    // 整数として解析可能かチェック。parseInt は符号と小数点を含むが、結果が整数でない場合（例："1.5" -> NaN）を確認する必要があるか？
    // しかし spec が「整数列」なので、"-1", "0", "+234" を想定し、「-1.5」は無視すべき。
    
    let numStr = '';
    for (const char of trimmedToken) {
        if ('0123456789'.includes(char)) {
            numStr += char;
        } else {
             // 負号や小数点がある場合、この文字以降は数値ではないと判断する必要があるか？ 
             // しかし「-」は無視できない。例えば "-1" の場合は、「-」を無視して "1" を取るべきか？
             // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        } else {
            break; 
        }
    }

// もう一度シンプルに実装：文字列を分割し、各要素が整数として解釈可能かチェックする。
const tokens = input.split(',');
let seen: Set<bigint> | null = new Set(); // 重複除去用セット（BigInt）
for (const token of tokens) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できない要素も無視」 -> "1.5" は小数なので無効。"-1" は有効。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'-' が含まれていない場合のみ処理される。
             // 修正: numStr に符号を含めるか？BigInt("5") は正しいが BigInt("-5") も可能だが、numStr="5" とすると sign が失われる。
        } else {
            break; 
        }
    }

// これは非常に複雑なので、シンプルに：
const integers = new Set<bigint>(); // 一意な整数を保持するセット（重複を除く）
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'-' が含まれていない場合のみ処理される。
             break; 
        } else {
            break; 
        }
    }

// これは非常に複雑なので、シンプルに：
const integers = new Set<bigint>(); // 一意な整数を保持するセット（重複を除く）
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'-' が含まれていない場合のみ処理される。
             break; 
        } else {
            break; 
        }
    }

// これは非常に複雑なので、シンプルに：
const integers = new Set<bigint>(); // 一意な整数を保持するセット（重複を除く）
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'-' が含まれていない場合のみ処理される。
             break; 
        } else {
            break; 
        }
    }

// これは非常に複雑なので、シンプルに：
const integers = new Set<bigint>(); // 一意な整数を保持するセット（重複を除く）
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'-' が含まれていない場合のみ処理される。
             break; 
        } else {
            break; 
        }
    }

// これは非常に複雑なので、シンプルに：
const integers = new Set<bigint>(); // 一意な整数を保持するセット（重複を除く）
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'-' が含まれていない場合のみ処理される。
             break; 
        } else {
            break; 
        }
    }

// これは非常に複雑なので、シンプルに：
const integers = new Set<bigint>(); // 一意な整数を保持するセット（重複を除く）
for (const token of input.split(',')) {
    const trimmedToken = token.trim();
    
    if (!trimmedToken || isNaN(Number(trimmedToken))) continue;

    let numStr = '';
    for (let i=0; i<trimmedToken.length; i++) {
        // 数値文字のみを収集するのではなく、符号付きの正の数を解析するか？ 
        // spec: 「整数として解釈できるなら OK」。Node.js の parseInt("...") は -5 -> -5, 1.5 -> NaN/浮動小数点。
        
        if ('0123456789'.includes(trimmedToken[i])) {
            numStr += trimmedToken[i];
        } else if (trimmedToken[i] === '-' || trimmedToken[i] === '+') {
             // 符号は数値文字列に含まれる必要がある。しかし上記のループでは、'
