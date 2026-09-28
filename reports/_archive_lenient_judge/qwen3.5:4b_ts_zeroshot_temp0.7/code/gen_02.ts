import * as readline from 'readline';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim(), 10));
  const validNumbers = parts.filter((n): n is number => !isNaN(n));
  
  if (validNumbers.length === 0) {
    rl.close();
    return;
  }

  // Map にして重複を除去し、順序を保つ（または不要であれば単に Set で良いが、要求は「個数と合計」なので順序は重要でない）
  const uniqueMap = new Map<number, number>();
  
  for (const num of validNumbers) {
    if (!uniqueMap.has(num)) {
      uniqueMap.set(num, 0);
    }
    // ここでの意味の解釈：仕様「重複を除いた整数」について個数を求める。
    // もし入力に [1, 2, 1] の場合、「重複を除いた整数」とは、一意になった数値集合 {1, 2} を指すのか？それとも出現回数をカウントするのか？
    // 文脈「重複を除いた」→ ユニークな要素のみを扱う。そのユニークな要素の個数（種数）と合計を求める。
    // つまり、[1, 2, 1] -> Unique: {1, 2} -> Count=2 (1 と 2 の種類の数), Sum=3.
    
    // しかし、「重複を除いた」は「出現回数をカウントするのではなく、ユニークな数値だけを集める」という意味である。
    // その後の「個数と合計」は、そのユニーク集合に対して求めるものとする。
    
    uniqueMap.set(num, 1); 
  }

  const counts = Array.from(uniqueMap.values()); // これはすべてが 1 なので実際には無効だが意図を確認するため
  // いや、上記ロジックで uniqueMap の値は常に 1 になる（存在するか否かのフラグ）。
  // 「重複を除いた整数」＝ユニークな数値集合。その集合の「個数」と「合計」。
  
  const count = uniqueMap.size;
  let sum = 0n as bigint;
  for (const num of validNumbers) { 
    if (!isNaN(num)) { // double check logic, though filter already did it. But wait...
      // もし [1, 2, 3] の場合、ユニーク数は 1, 2, 3。個数=3, 合計=6.
      // しかし、もし「重複を除いた」という表現が、「出現回数をカウントするのではなく、その数が現れたかどうかだけ」を指すのか？
      // 「それらのうち『重複を除いた整数』について...」→ この文節は、入力データからユニークな数値を取り出す操作を示唆している。
      // 取り出したセットに対して個数（要素の数）と合計を求める。
    }
  }

  let totalSum = BigInt(0);
  
  for (const num of validNumbers) {
    if (!isNaN(num)) {
      const bigNum = BigInt(num);
      totalSum += bigNum; // ここで注意: 仕様は「重複を除いた整数」について。つまりユニークな数値の合計か？それとも元のリスト全体の合計か？
    }
  };

  // 再考: 「『重複を除いた整数』について、個数と合計を求めます。」
  // この文法構造からすると、「対象となるものが：[1,2,3] の「重複を除いた」形（例：{1,2,3}）である」と解釈するのが自然。
  // その場合、「個数」はユニークな要素の数。「合計」はそのユニークな要素の和である。
  
  const uniqueSet = new Set<number>();
  for (const num of validNumbers) {
    if (!isNaN(num)) {
      uniqueSet.add(num);
    }
  }

  let uCount = 0; // Unique elements count? No, wait. 
  // Let's re-read carefully: "それらのうち『重複を除いた整数』について" -> For the integers that are 'duplicates excluded'.
  // If input is [1, 2, 3], duplicates excluded set is {1, 2, 3}. Count=3, Sum=6.
  // If input is [1, 1, 2], duplicates excluded set is {1, 2}. Count=2 (unique values), Sum=3.
  
  const uniqueValues = Array.from(uniqueSet);
  uCount = uniqueValues.length;
  
  let sumVal: bigint | number = BigInt(0); // Use BigInt for safety though spec says fits in 64-bit int range of result? "合計は 64bit 整数の範囲に収まります" implies the SUM itself.
  
  for (const val of uniqueValues) {
    const bigVal = BigInt(val);
    sumVal += bigVal;
  }

  console.log(`count=${uCount} sum=${sumVal}`);
});

rl.on('close', () => {}); // Handle end if needed, but readline logic usually handles single line or keeps open. 
// The spec says "標準入力から...受け取ります" (singular action). Usually one run per process exit for these coding tasks unless specified otherwise.
