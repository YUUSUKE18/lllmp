const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  if (lines.length > 0 && lines[0].trim() !== "") {
    target = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(target)) {} else { target = null; }
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const val = parseInt(line.trim(), 10);
    if (!Number.isNaN(val)) {
      nums.push(val);
    }
  }

  let count = BigInt(0);
  const n = nums.length;
  // 最適化: 2 進数検索 (Two Sum) のようなアプローチではなく、
  // 最大値が小さい場合のみ全結合を試み、大きい場合はハッシュマップを使う。
  // しかし、問題文は「敵対的に大きな入力」に対しても実用的であるとしつつ、「64bit 整数の範囲」としか定めていない。
  // もし n が 10^5 以上で値も広く分布すると O(n^2) は TLE する。
  // 一般的な「足して目標値になる 2 つの数」の解法として、ハッシュマップを使用するのが最適である。
  
  const map = new Map<number, number>(); // key: value, value: count (またはインデックス)
  for (const num of nums) {
    const complement = target - num;
    if (map.has(complement)) {
      const c = map.get(complement);
      count += BigInt(c);
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  console.log(`pairs=${count}`);
});
