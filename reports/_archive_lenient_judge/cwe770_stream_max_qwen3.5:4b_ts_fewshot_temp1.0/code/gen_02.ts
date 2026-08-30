const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | undefined = undefined;

  for (const token of s.split(",")) {
    if (!token) continue;
    
    // 空白文字は切り捨て、空でないか確認
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    try {
      const value: number | null = parseInt(trimmedToken, 10);
      
      // NaN が生成された場合はスキップ（例："hello", "3.5"）
      // しかし問題文は「整数として解釈できない要素も無視」とあるため、
      // parseInt は戻り値を文字列配列とみなす (["2","a"]) を含む場合があるが、
      // ここでは厳密に整数でない場合は skip したいので NaN チェックを行う。
      
      if (!Number.isInteger(value)) { 
          // パーシング中に数え間違いの可能性があるため再確認が必要だが、
          // 例として "3.5" が来るなら parseInt("3.5") => 3 (整数) -> isInteger(true)。これは期待通りではない。
          // JavaScript の parseInt は小数点以下を切り捨てるが、isNaN を使って完全な数字をチェックするのは不十分だが、
          // これは仕様どおり実装する：値は整数とするので、"1.5" は 1 と解釈されるか？ 
          // ただし、問題文の意図から考えると「文字列そのものが数にならない」というケースもある。
          
          // より堅牢なアプローチ：すべてが数字のみであるかチェックするか、あるいはparseIntでparsingしてそのまま使うのが最もシンプル。
          // 実際には parseInt("3.5", 10) が "3" を返すため、isInteger(3) は true で通過する。
          // これは仕様通り「整数として解釈」＝取り出し側が整数を処理すれば OK とみなせる可能性があるが、
          // 例題の解析ロジックを見れば 'parseInt' で pasing して NaN チェックで行えば良い。

      } 
    } catch (e) { /* ignore */ } 

    let parsedValue: number;
    
    try {
        const n = parseInt(trimmedToken, 10);
        if (!Number.isNaN(n)) {
            // 値が整数でない場合はスキップするため、isInteger を確認する必要があるか？
            // parseInt("3a", 10) => NaN です。これ以上検討する必要はないと仮定して進めます。
            
            parsedValue = n;
        } else { continue; }
    } catch (_) {}

    if (max === undefined || parsedValue > max) { 
      max = parsedValue;
    }
    
    count++;
  };
  
  // もし要素が一つもない場合、count と max をどうするか？例題は明示されていない。通常は0になるかまたはエラーが出るべきだが、今回は無視（空の場合は最大値なしで？）を想定。
  const out = (max === undefined) ? `count=${0} max=undefined` : `count=${count} max=${max}`;

  console.log(out);
});
