const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let total = 0;
  const memo = new Map<number, number>();

  for (const line of lines) {
    if (line === "") continue;

    let n: number;
    const num = parseInt(line, 10);

    if (isNaN(num)) continue;

    if (num === 1) {
      total += 0;
      continue;
    }

    // メモ化された値があるか確認
    if (memo.has(num)) {
      total += memo.get(num);
      continue;
    }

    // 再帰とメモ化による計算
    let count = 0;
    let current = num;
    const path = new Set<number>(); // サイクル検出用

    while (current !== 1 && !path.has(current)) {
      path.add(current);
      if (current % 2 === 0) {
        current = Math.floor(current / 2);
      } else {
        current = 3 * current + 1;
      }
      count++;
    }

    // 1に到達したか、またはサイクルに入ったか
    if (current === 1) {
      // 1に到達したときのステップ数は count + 1 (操作回数)
      // 問題文の解釈: nが1の手数は0。操作の回数を数える。
      // n=2 -> 1 (1回)
      // n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
      // 1スタートの場合:
      // n=1 -> 0
      // n=2 -> 1 (1回)
      // n=3 -> 10 (1回)
      // 10 -> 5 (2回)
      // 5 -> 16 (3回)
      // 16 -> 8 (4回)
      // 8 -> 4 (5回)
      // 4 -> 2 (6回)
      // 2 -> 1 (7回)

      // count は num から 1 に到達するまでに実行した操作の回数。
      // 終了条件が num=1 のときの手数が 0 なので、
      // 1に到達するまでのステップ数を count に加算する。
      // 現在の実装では、whileループ内でnを置き換える操作をcountに加算している。
      // n=1の場合は0。nが1でなければ、whileループを抜けたときのcountが操作回数になる。
      
      // ループが終了した時点で、countが num から 1 へのパスの長さになっている。
      total += count;
      memo.set(num, count);

    } else if (path.has(current)) {
      // サイクルに入った場合、この経路は無限に続くか、
      // 問題の意図に従えば、この値は到達不能と見なされるか、
      // または、到達不能な場合は計算を打ち切るか、あるいはメモ化の値をそのまま使う。
      // ただし、この問題は通常、3n+1問題（コネルの予想）に関連しており、
      // 到達保証があるため、サイクル検出は安全策。
      // サイクルに入った場合、この値は1に到達しないため、計算結果は不定となるが、
      // 仕様上は「1に到達するまでの手数を求めます」なので、サイクルは発生しないと仮定するか、
      // または、到達不可能として扱う。
      // ここでは、サイクルが発生した場合は、その経路は計算しない（または無限ループを避ける）と仮定する。
      // 実際の問題では、この種の問題は必ず1に収束するとされるため、サイクルは発生しないはず。
      // 発生した場合は、そのパスの計算は完了しないため、スキップする。
    }
  }

  console.log(`total=${total}`);
});
