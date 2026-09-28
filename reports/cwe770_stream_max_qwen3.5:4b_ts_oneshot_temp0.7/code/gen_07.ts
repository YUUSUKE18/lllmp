const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER; // 64bit integer の下限に近い初期値。空配列なら最小の整数が取得されないようにする必要があるか？
  
  // 入力がない場合 (empty input) をどうするか指定なしだが、通常は最大値を定義しないや負無限大とする。
  // しかし、「要素数」と「最大値」を求めるので、要素数が0の場合どう出るかは不明。
  // 一般に、空配列の場合は count=0, max=? というケースがあるがここでは整数入力がある前提とみなすか、または最小の64bit整数をmaxとするのが安全なデフォルトになるかもしれない。
  // しかし問題文「最大値を求める」→要素がないと定義不能だが、実装として初期化は必要。
  // もし空なら count=0, max=? というケースがあるがここでは負無限大に近いものを初始値にします。(Number.MIN_SAFE_INTEGER は -9e18) 
  // しかし64bitの範囲内なのでより小さい数の方が良いかもしれませんが、整数列がない場合は何を書けばよいのか不明確。
  
  let first = true;

  for (const f of s.split(",")) {
    if (/^\s*$/.test(f.trim())) continue; // カンマ区切りで空や空白をスキップ
    
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;

    count++;
    
    if (first || n > max) { 
      max = n; 
      first = false; 
    }
  }
  
  // もし要素がない場合、max の値は初期値のまま。
  // しかし通常の問題では入力には少なくとも1つの整数が含まれることが多いが、
  // ここでは空の場合はどうするか？
  // もし count=0 なら max は何を書くべきか不明確なので、count > 0 で計算する前提としつつ、
  // max の初期値は最小の64bit整数より小さいものにするのが適切かもしれない。
  
  console.log(`count=${count} max=${max}`);
});

// isFinite check を追加した方が安全だが parseInt は常に finite な数字を返すことが多いが NaN が除く必要がある。
