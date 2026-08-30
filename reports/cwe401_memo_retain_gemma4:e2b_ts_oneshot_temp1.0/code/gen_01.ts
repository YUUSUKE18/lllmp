let memo: Map<number, number> = new Map();
let total_steps: number = 0;

process.stdin.on("data", (data: Buffer) => {
  const input = data.toString().trim();
  if (input === "") return;

  const n = parseInt(input, 10);
  if (Number.isNaN(n)) return;

  let current = n;
  let steps = 0;

  // 1に到達するまでの手数を計算
  while (current !== 1) {
    if (memo.has(current)) {
      // メモ化された値があれば、その結果を適用して次の計算に進む
      const cached_steps = memo.get(current)!;
      // 実際には、この問題は「nから1への操作の回数」を求めるものであり、
      // 既にメモ化されている値が「1への到達までの手数」を意味する。
      // ここでは、現在のcurrentから1への経路を探索するのではなく、
      // 操作の回数を直接計算し、その結果をメモ化する。
      // ペルンのミンの問題と同様に、現在の値が既に計算済みであれば、その結果を利用する。
      // しかし、この問題は「nが1になるまでの操作回数」を問うているため、
      // 遷移ベースで計算し、到達したときにメモ化するのが適切。
      // ただし、問題文の「置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
      // 1回のクエリでこの計算を求め、その結果を合計するという意味合いが強い。
      // したがって、各クエリごとに計算し、その結果を合計する。
    }

    // 遷移の実行
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 計算した手数を合計に加算
  total_steps += steps;

  // メモ化（ここでは、各nに対する経路計算の結果をメモ化する）
  // ただし、これは経路の長さ（steps）を求めるため、nが非常に大きい場合、
  // 経路探索が非効率になるため、ここでmemo化を行う。
  // この問題は「nから1へのパス」を求めるため、標準的なメモ化（動的計画法）を適用する。
  // ただし、入力がクエリ単位であるため、ここでは各クエリに対する計算結果を保持する。
  memo.set(n, steps);
});

process.stdin.on("end", () => {
  console.log(`total=${total_steps}`);
});
