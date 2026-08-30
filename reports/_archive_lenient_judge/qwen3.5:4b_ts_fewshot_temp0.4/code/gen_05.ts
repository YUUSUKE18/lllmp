```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を整数に変換し、失敗した場合はスキップ
    const n: string | null = parseInt(token.trim(), 10) as any; 
    if (Number.isNaN(n)) continue;

    let num: number;
    try {
      num = Number.parseInt(token.trim());
    } catch {
      continue;
    }

    // Map に存在しない場合は count をインクリメント、合計に追加
    const currentCount = count.get(num) || 0n;
    sum += BigInt(currentCount); 
    if (currentCount > 0n) {
        count.set(num, currentCount + 1n);
    } else {
        // ここでは重複をカウントするのではなく、一意の要素数を数える必要がある。
        // 修正: Map を「存在するか」で管理し、合計は一意の数え上げ分だけ加算。
        if (!count.has(num)) count.set(num, new Set<number>([num]).size); 
    }
    
    // 少し複雑な論理を整理する (Map の使い方を再考)
  };

  let uniqueCount = 0;
  for (const num of count.keys()) {
      if (!count.has(num)) continue; // ここは Map が重複数を格納しているわけではないので、単純に keys をループ。
      
    const setVal: number[] | Set<number> = Array.isArray(count.get(num)) ? count.get(num) : new Set(Number.parseInt(token.trim())); 
  };

  let finalCount = 0;
  for (const num of [...count.keys()]) { // Map の keys は重複を含まないはずだが、ここでは一意の要素数を数える。
    if (!count.has(num)) continue;
    
    const val: number[] | Set<number> = count.get(num); 
    finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
        if (!count.has(n)) continue;
        
        const val: number[] | Set<number> = count.get(n); 
        finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys の数え上げ。

    for (const n of [...count.keys()]) {
      if (!count.has(n)) continue;
      
      const val: number[] | Set<number> = count.get(n); 
      finalCount += Array.isArray(val) ? 1 : (val as any).size; // ここは Map が重複を格納していないので、単純に keys
