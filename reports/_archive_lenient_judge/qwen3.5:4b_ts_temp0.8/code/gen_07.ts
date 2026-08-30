import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let buffer = '';

rl.on('data', (chunk) => {
  buffer += chunk;
});

rl.on('close', () => {});

function main() {
  const line = 'undefined' !== typeof buffer ? '' : buffer.trim();
  
  if (!line.length || !/^-?\d+$/.test(line)) return '';

  // カンマ区切り、空行・空白無視し整数に分解する。正規表現で各要素をフィルタリング（有効な整数のみ）。
  const tokens = line.split(',').map(s => {
    const trimmed = s.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) return null; // 空白・非数値はスキップ
    
    try {
      return parseInt(trimmed, 10);
    } catch (e) {
      return null; 
    }
  }).filter(item => item !== null).map(Number);

  if (tokens.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  // セットを使って重複を除く。数値は正しくソートされておらず、単純な配列の map で集合化するのが適切か検討が必要だが、ここでは単に「どの数字が出現しているか」をカウントする必要があるため、セットを使用しその後に再カウントするか、または直接 Map を使用して count と sum の同時計算を行うのが最適。
  // しかし、「重複を除いた整数」という要件は意味上、各値について一度だけ数えることを要求している可能性がある（例：2,3,2 -> {1:4} が正しいのか？）。通常「個数」はその数字が何回現れたかを指すが、もし「重複を除去して得たリストの要素の数」と解釈すると意味が変わる。
  // 文脈から判断、「重複を除いた整数」＝ユニークな数の集合に対して、「その数が出現した回数（count）」と「その数たちの合計（sum）」を求めるのが自然ではないか？しかし、通常この手の问题是各値を一度だけカウントし、その数は count を持つ。
  // しかし問題文は『個数』と『合計』という単数形なので、ユニークな要素のリストについてそれぞれに該当するデータ構造を持つわけではないはずである。「重複を除いた整数」というのは「2,3,4」に対して、「2:1', '3:1', '4:1'」といった状態を意味し、その『個数』は 3（ユニーク数の総計）またはそれぞれの count を指すか？
  // より自然な解釈：入力 [a,b,c,a] → 重複を除いたリストは [a, b, c], その時の「個数」と「合計」を求めよ。つまり、a は出現回数をカウントせず、「その数が存在するかどうかだけ判断し、ユニーク要素の総計を count とそれらの和を sum」と解釈するのが妥当か？
  // しかし通常は [2,3,2] → a=2,b=3,c=2. 重複を除くと {a,b}。個数=2(2と3).合計=5(2+3)。または、各数字の出現回数をカウントし sum をその総和とするか？
  // 問題文「それらのうち『重複を除いた整数』について」→ユニークな値に対して。つまり [1,2,2] → {1:?, 2:?}。個数=2 (1 と 2 の存在)。合計=3 (1+2) か？
  // もし出現回数をカウントする場合「各数字の出現回数」というのが正確には「重複を除いた整数」ではなく「それぞれの整数の頻度」であるはずだ。「重複を除く」操作が施された後、残った要素に対して「個数と合計を求めます」。つまり [1,2,3] → count=3 sum=6。[1,1,2,2] → 重複除くと {1,2} → count=2 sum=3。この解釈を採用する。
  
  // アルゴリズム：ユニークな数字のセットを取得し、その要素数と値の総和を計算。
  const uniqueNumbers = new Set<number>();
  for (const n of tokens) {
    if (!isNaN(n)) {
      uniqueNumbers.add(Number(n));
    } else {
      // NaN や他の非整数はスキップ済みだが、ここでは安全に処理する（Set に変換前の変数型チェック）
    } 
  }

  const count = uniqueNumbers.size;
  
  let sum = 0n;
  for (const n of tokens) {
    if (!isNaN(n)) {
      // BigInt で合計を計算し、64bit に収まることを仮定する（仕様通り）
      sum += Number(n); 
    }
  }

  console.log(`count=${count} sum=${sum}`);
  
  rl.close();
}

// Node.js の環境チェックと主実行ロジックの整合性を保つ必要があるが、スクリプトは単一のイベントループで完結させる。
if (typeof process !== 'undefined' && typeof window === 'undefined') { // サーバー側のみとして動作させるため
  main();
} else if (!buffer) return;

// ブラウザ環境ではエラーになる可能性があるが、Node.js を前提とすると上記のロジックで OK。
