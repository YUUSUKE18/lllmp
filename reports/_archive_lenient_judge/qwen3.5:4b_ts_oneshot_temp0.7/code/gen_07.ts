const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // カンマ区切りで分割し、空白・空行を除去して要素を取得する関数
  function parseElements(inputString: string): number[] {
    return inputString.split(/[\s,]+/).map(e => parseInt(e.trim(), 10)).filter(n => !Number.isNaN(n));
  }

  const nums = parseElements(s);
  
  // リストをソートして重複を除くため、セットを使う（型推論で Set<number> が得られる）
  const uniqueSet: Set<string> = new Set();
  for (const n of nums) {
    if (!Number.isNaN(n)) uniqueSet.add(String(n));
  }

  let count = 0; // 重複を除いた個数（一意の整数の個数）
  let sum = BigInt(0); // 合計を 64bit として扱うため、BigInt を使用

  for (const str of uniqueSet) {
    const n: number | bigint = parseInt(str, 10);
    
    count++; 
    if (!Number.isNaN(Number(n))) {
      sum += BigInt(n); // 整数の場合のみ加算する（解析失敗の場合はスキップ）
    } else {
        // もし文字列を数値に変換できない場合は、BigInt のまま加算し続ける。
        // しかし仕様は「整数として解釈できない要素も無視」なので、ここでの処理を確認します。
        // 上記の parseElements で既に NaN を除くため、uniqueSet に入るのはすべて有効な文字列です。
        // ただし parseInt が失敗する場合（例："abc"）を考慮し、BigInt の補完として加算するロジックは不要ですが、
        // ここでは整数のみを加算します。
    }

    // 修正：上記の loogic は少し複雑にしました。シンプルにするため再考。
    const nValue = parseInt(str, 10); 
    if (!Number.isNaN(nValue)) {
      sum += BigInt(nValue);
    } else {
        // もし uniqueSet に入っているものが整数でない場合は、sum に含めない（ただし count はカウントする？）
        // 問題文：『重複を除いた整数』について。つまり要素が整数でないものは除外されるべきか？
        // "整数として解釈できない要素も無視します" -> この要素は処理対象外。
        // しかし uniqueSet を構成する前に、数値チェックを行うのが確実です。
    }
    
    // 再構築：最も安全で簡潔な方法
  }

  // 最終的な計算ロジック（修正版）
  const validNumbers: number[] = [];
  
  for (const n of nums) {
      if (!Number.isNaN(n)) {
          validNumbers.push(Number(n));
      }
  }
  
  const uniqueCountSet = new Set<number>();
  let count = 0;
  let sumBigInt: bigint = BigInt(0);

  for (const n of validNumbers) {
    if (!uniqueCountSet.has(n)) {
      uniqueCountSet.add(n);
      count++; 
      sumBigInt += BigInt(n);
    }
  }

  console.log(`count=${count} sum=${sumBigInt}`);
});
