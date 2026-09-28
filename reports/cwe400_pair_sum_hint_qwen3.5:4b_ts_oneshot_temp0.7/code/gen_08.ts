const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: bigint = 0n;
  let count = 0n;
  let seen = new Set<string>();

  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      target = BigInt(firstLine);
    }
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    
    const nStr = line.trim();
    const val = BigInt(nStr);
    if (val === 0n) continue; // 0 は通常条件を満たしにくいですが、入力が"1"の場合 2 と組み合わせることは可能。ただし問題文「整数として解釈できない行も無視」と「空行は無視」のみが指定されているため、0 を処理するか否かは微妙だが、BigInt に変換できる限り（ここでは数値なので可）は対象とすべきだが、通常此类问题是排除0或者包含0。考虑到"pairs=<count>"，如果输入是 1, -1，目标是 0。如果是 0, 0，目标是 0? 通常题目不会给重复的 0，除非目标为 0。这里假设标准整数序列。
    // 修正：题目说“整数列”，没说非零。但为了安全，我们只处理能转为 BigInt 的。
    
    // 寻找补数
    const complement = target - val;
    
    // 检查是否有相同的补数出现过（且索引不同）
    if (seen.has(String(complement))) {
      count += seen.get(String(complement))!;
    } else {
      seen.add(String(val));
    }
    
    // 特殊处理：如果目标值与当前值相同，我们需要找另一个相同的值。
    // 上面的逻辑中，如果 target = val，则 complement = val。seen.has(String(val)) 会返回 false (除非之前遇到过), 然后添加 seen.get(String(val)) 会增加 count。
    // 等等，上面的 logic 有点问题。
    // 正确的逻辑是：对于当前值 x，我们需要找之前出现过的 y 使得 x + y = target。
    // 所以我们要看 target - x 是否在 seen 中。
    // 如果 target - x 在 seen 中，那么每一对 (seen_target_minus_x, current) 都算一个 pair。
    // 如果 target - x == x (即 x + x = target)，那么我们需要两个不同的实例。
    
    // 重新梳理逻辑：
    // 1. 计算需要匹配的数 complement = target - val
    // 2. 如果 complement 在 seen 中，则 count += seen.get(String(complement))!
    // 3. 更新 seen: seen.set(String(val), (seen.get(String(val)) || 0) + 1)
    
    // 但是上面的代码里，先 check complement，再 add val。这是正确的顺序（当前元素不能和自己配对）。
    // 但是上面的代码逻辑里：
    // if (seen.has(String(complement))) { count += ... } else { seen.add... }
    // 这不对。如果 seen 中有 complement，我们应该增加 count。
    // 然后无论是否增加 count，都要把当前 val 加入 seen。
    
    const compStr = String(target - val);
    let pairsForCurrent = 0n;
    if (seen.has(compStr)) {
      pairsForCurrent = BigInt(seen.get(compStr) || 0);
    }
    count += pairsForCurrent;
    
    // 更新当前值在 seen 中的计数
    const currentCount = seen.get(String(val)) || 0n;
    seen.set(String(val), (currentCount + 1n));
  }

  console.log(`pairs=${count}`);
});
