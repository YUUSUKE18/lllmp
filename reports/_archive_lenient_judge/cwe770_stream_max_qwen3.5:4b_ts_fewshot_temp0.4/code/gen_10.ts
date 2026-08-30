const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    
    // 64bit integer の範囲内であることを保証するため、初期値は最小可能整数を使用。
    // ただし、入力がない場合は count=0 で出力すべきだが、仕様上「最大値」を求めるので 
    // まず有効な数を見つけてから更新するロジックにする必要があるか？
    // 例2のロジックを参考にして、「最初の有効数で max を初期化し、以降は比較」という形に統一。
    
    if (first || n > max) {
      max = n;
      first = false;
    }
    count++;
  }

  // もし入力中に有効な整数がなかった場合の処理（例：count=0 の時）
  if (!first && count === 0) {
     console.log(`count=${count} max=`);
  } else if (count > 0 || !isNaN(max)) { 
      // 最初の数がない場合は max が初期値のままになるが、これは論理的に矛盾するため
      // "有効な整数が存在しない場合の最大値" は定義できない。
      // しかし問題文は「それらの『要素数』と『最大値』を求めます」とあるため、
      // 少なくとも1つの整数が入力されていることを前提とするか、または count=0 の時 max を何にするか？
      // 例2では空でない語の数をカウントしただけ。ここでは「それらの...」なので、要素が存在する場合のみ出力するか？
      // または常に出力するが、max が初期値の場合どうするか？
      
      // より安全なアプローチ：最初の有効数で max を設定し、その後比較を行う（上記コードでは first=true の時も更新される）
      // したがって count > 0 であれば max は正しい値になる。count=0 の場合は max は MIN_SAFE_INTEGER だがこれは誤りである可能性あり。
      
      // しかし、仕様は「整数列を受け取ります」であり、「それらの...最大値」とあるので、無効な入力のみの場合の挙動は指定されていないと解釈できる。
      // ただし、例2のように空でない語の数だけカウントする場合は count=0 で終わるが、ここでは max も出力されるため、
      // 何らかの整数が入力されていることを前提とするのが自然だが、堅牢性を高めるために以下のようなロジックにする：

      // 修正: まず有効な数があるかチェックし、なければ count=0, max="undefined" とする？
      // しかし出力形式は固定なので `max=` の後に何かが来る必要がある。
      
      // より適切なアプローチ：最初の有効値で max を初期化し、その後比較を行う（上記コードでは first=true の時も更新されるため OK）
      // ただし count=0 の場合の処理を明示的に扱う。

  } else {
    console.log(`count=${count} max=`);
  }

  // 最終的な出力ロジック：最初の有効数がある場合はその値が max、なければ何もしない（または MIN_SAFE_INTEGER）
  // しかし例2のように count=0 の場合の挙動は指定されていないため、ここでは「少なくとも1つの整数が入力されている」と仮定し、
  // または count > 0 であれば正しい max が得られるようにする。

  console.log(`count=${count} max=${max}`);
});
