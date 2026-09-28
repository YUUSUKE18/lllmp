const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: bigint | null = null;
  const nums: BigInt[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    if (target === null && trimmed !== "") {
      // 1 行目: 目標値
      const valStr = trimmed;
      let n = 0n;
      for (const ch of valStr) {
        if (ch >= "0" && ch <= "9") {
          n = n * 10n + BigInt(ch - "0");
        } else {
          // 負の桁の場合も想定 (文字列が "-" で始まる可能性あり)
          // ただし、仕様は「目標値が与えられる」とだけあり、符号なしか符号付きかの明示がない。
          // 通常整数系としては負数を扱えるよう実装するが、解析の複雑さが極端に増大するため、
          // まずは文字列からの直接変換を試みる (BigInt のコンストラクタを利用するのが安全)。
          try {
            n = BigInt(valStr);
          } catch (e) {
            // 変換エラーの場合を無視するか、あるいは目標値をスキップする。
            // 実装の簡潔さを優先して、直接の変換結果を使う。
            continue; 
          }
        }
      }
      target = n;
    } else if (target !== null) {
      // 2 行目以降: 整数列
      try {
        nums.push(BigInt(line));
      } catch (e) {
        // 変換できない行は無視
      }
    }
  }
  
  let count = 0n;
  if (target !== null && nums.length >= 2) {
    const n = nums.length;
    // 二重連結ループを使用。O(N^2) でも実用的な範囲なら許容されるが、
    // より高速なアルゴリズム（ハッシュ集やソート）も検討できる。
    // 入力サイズによりますが、N が非常に大きければ O(N^2) は TLE に直面する可能性あり。
    // ハッシュセットを使用することで O(N log N) または O(N) のように最適化可能。
    
    const seen = new Map<bigint, boolean>();
    for (const num of nums) {
      const complement = target - num;
      if (seen.has(complement)) {
        count += BigInt(seen.get(complement)!);
      }
      seen.set(num, true);
    }
  }
  
  console.log(`pairs=${count}`);
});
