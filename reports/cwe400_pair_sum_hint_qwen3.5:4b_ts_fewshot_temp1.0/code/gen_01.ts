const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let firstLineRead = false;
  let target: number = -1;

  // 目標値（1 行目）の読み込み
  const lines = s.split(/\r?\n/);
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (!isNaN(parseInt(firstLine, 10))) {
      target = parseInt(firstLine, 10);
      firstLineRead = true;
    }
  }

  if (!firstLineRead || isNaN(target)) {
    console.log("pairs=0");
    return;
  }

  // 整数の列（2 行目以降）をパース
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // 空行無視
    const parts = line.split(/\s+/);
    let hasNum = false;
    for (const p of parts) {
      const val = parseInt(p, 10);
      if (!isNaN(val)) {
        nums.push(val);
        hasNum = true;
      } else if (!hasNum) {
        // ある程度数字があるのに、最初の数値が非整数だった場合の扱い
        // しかし仕様では「2 行目以降には整数が 1 行に 1 個ずつ並びます」とあり、
        // 「空行は無視し、整数として解釈できない行も無視します」とあります。
        // ここは该行全体を無効にするか部分読みするかです。通常は「行」単位で処理する方が自然。
        // ただし「整数として解釈できない行も無視します」とあるので、该行全体スキップすべきか。
        // 例題2では「w.trim() !== ""」でフィルタリングしたが、今回は「1 行に 1 個ずつ並びます」とあり、
        // 一行が非整数ならその行自体をスキップするべきと解釈。
        break; 
      }
    }
    if (hasNum) {
      // 一行から複数の数値がある場合でも、すべて加算して処理するか？
      // 課題文:「2 行目以降の整数のうち、足して目標値になる 2 個の組」
      // 「1 行に 1 個ずつ並びます」とあるが、実際は一行に複数の数字がある可能性もある。
      // その場合も「整数として解釈できない行（非整数を含む行）」をスキップ。
      // しかし p が非整数ならその行全体は無効か？
      // 「整数として解釈できない行」→ 少なくとも 1 つが非整数ならその行は無効
      if (!hasNum) {
        continue; 
      }
    } else {
       // rows[i] に数値がない場合はスキップ (hasNum=false の場合)
    }
  }

  // 再処理：安全に整数のみを抽出する
  const validInts: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // 空行無視
    // 一行全体が数値列として解釈可能か確認
    const parts = line.split(/\s+/);
    let allInt = true;
    for (const p of parts) {
      if (isNaN(parseInt(p, 10))) {
        allInt = false;
        break;
      }
    }
    if (!allInt) continue; // 非整数を含む行は無視

    for (const p of parts) {
      const val = parseInt(p, 10);
      validInts.push(val);
    }
  }

  let pairs = 0;
  if (validInts.length < 2) {
    console.log("pairs=0");
    return;
  }

  // O(N^2) でペアを数える。N が数十万以下なら OK だが、大規模入力に対しては最適化が必要か？
  // 「敵対的に大きな入力」→ N が 10^5〜10^6 程度か。O(N^2) は時間制限に失敗する可能性あり。
  // より効率的な方法：ハッシュマップで（target - i）の存在数を数える。
  
  const freq = new Map<number, number>();
  
  for (const x of validInts) {
    const needed = target - x;
    
    // すでに map に存在するかチェック
    let count = 0;
    if (freq.has(needed)) {
      count = freq.get(needed)!;
    }
    pairs += count;

    // x をカウントに追加
    let cx = freq.get(x);
    if (cx === undefined) {
      freq.set(x, 1);
    } else {
      freq.set(x, cx + 1);
    }
  }

  console.log(`pairs=${pairs}`);
});
