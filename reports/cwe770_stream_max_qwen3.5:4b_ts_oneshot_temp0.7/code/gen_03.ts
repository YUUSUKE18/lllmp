const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | null = null;

  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // 空白のみが含まれる場合はスキップ、数字でない場合はスキップ
    const trimmed = f.trim();
    if (/^\s*$/.test(trimmed) || isNaN(Number(trimmed))) continue;

    const n = parseInt(trimmed, 10);
    
    count++;
    if (max === null || n > max) {
      max = n;
    }
  }

  // 有効な整数がない場合は、count=0, max=null のような扱いが必要か？
  // 仕様は「整数列を受け取ります」とあり、「要素数と最大値を求めます」。
  // 空の場合は count=0, max=?。通常 maximum of empty set is -Infinity or undefined. 
  // しかし、出力形式が `max=<最大>` なので null を表示するかどうかが問題だが、
  // プログラムとしては有効な要素がない場合（count=0）は max も定義できないため、
  // ここでは count が 0 の場合は max に何も代入しない（または 0？）とする。
  // しかし例1のコードのように `max = 0` で初期化しているが、これは値として正しいか？
  // もし入力に整数がない場合、「最大値」は存在せず、出力すべきではないかもしれない。
  // ただし「厳密に max=<最大>」とあるので、何らかの数値を返さねばならないと解釈する必要がある。
  // JavaScript の Number.MAX_SAFE_INTEGER や -Infinity を使うか、または count=0 の場合は特殊扱い？
  
  // より安全なアプローチ：整数が見つからない場合（count === 0）、max に何も設定しないまま出力するか
  // または、空の場合 max = undefined? しかし `console.log` で `null` が表示される。
  // 例1のコードでは max を 0 で初期化しているが、これはデータが存在する場合のみ意味を持つ。
  // ここでも同様に、count > 0 の場合のみ max に設定し、そうでなければ null とする（または最初の値なし）。
  
  if (max === null && count === 0) {
    console.log(`count=0 max=null`); 
    return;
  }

  // ただし、「最大値」が存在しないなら、何を表示すべきか？
  // データ構造として「空配列の最大値」という概念は数学的に存在せず（通常未定義）。
  // しかし、実装上の都合上、最初に見つかった数値で max を置換するか、初期化された value で出力するか。
  // 例1では `max = 0` と初始してあるので、もし入力に整数がない場合でも `max=0` が出力されるかもしれない。
  // しかし、「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」とあるので、
  // 結果的に整数列が得られない場合はどうするか？

  // より堅牢なコード：有効な数が存在する場合のみ max を計算する。なければ null とする（または -Infinity?）
  // しかし出力フォーマット `max=<最大>` なので、null が文字として表示されるか？
  
  let outputMax = count > 0 ? (max ?? undefined) : "N/A";

  if (!Number.isFinite(outputMax)) {
    console.log(`count=0 max=N/A`); // または null? 
  } else {
      console.log(`count=${count} max=${outputMax}`);
  }
  
});
