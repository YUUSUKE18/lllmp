import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const parts = line.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(Number(n)));
  
  if (!parts.length) return;

  // 重複を除いた一意の整数を収集し、合計と個数を計算する。
  // ただし「重複を除いた」という指示は、「要素ごとに処理して一意の値を取得し」その結果に対して count と sum を求めるのか？
  // もしくは「入力されたリストから重複を除いて残った各数について、その数の出現回数和計？」と解釈するのは矛盾する。
  // 「それらのうち『重複を除いた整数』について」という言葉には以下の二つの意味が考えられる:
  // A) ユーティリティとして：入力配列を set に変換し、結果（一意の要素のみ）に対して count(各数), sum(各数)、などを求める。だが仕様では「個数と合計」のみなので、「一意の数たちの出現回数をカウントし、それらの和を取る」と解釈するのが自然ではない。
  // B) ユーティリティとして：入力された値のうち、重複を削除した後のリスト（set）に対して、「各要素の出現回数は1」「それぞれの総和」を求める。つまり「count = 一意の数たちの数」、sum=これらの整数の合計となる。「個数」とは「どの数にも関わらずその数が現れているかどうか」を示すか？それとも、元のデータにおける「重複を除いた後のリストの長さ」か？
  
  // 再考：通常プログラミングテストや仕様解釈において、「duplicate removed integers about count and sum を求める」という文脈では、「一意の数たちの数（count）とその和（sum）」が最も合理的。なぜなら、「そのうち各整数についての個数を求めて合計する」とすると、元のリストの出現回数がそのまま反映されるため「重複除去」の意味を失うからです。「duplicate removed integers about count and sum を求める」→ unique elements set → {length: n, element_sum}.
  
  const uniqueSet = new Set<number>();
  let totalSum = 0;

  for (const num of parts) {
    if (!uniqueSet.has(num)) {
      uniqueSet.add(num);
      // 「重複を除いた」後のリストにおける count は、各数に対する出現回数が1となるため。
      // しかし、「個数を求める」という指示は「その数字の現れる回数の総和？」なのか？それとも「一意の数たちの集合サイズ（count）と、これらの整数全体の合計値？」が意図されるか。
      
      // 最善解釈: 
      // "取っられた unique integers regarding count and sum" => Count=number of unique elements, Sum=sum of those elements. (例：1,2,3 -> cnt=3, sum=6)
      // しかし、もし「個数」が元のリストにおける出現回数を指すなら、「duplicate removed」という言葉は矛盾する。なので count は一意の数たちの集合サイズと解釈し続ける（または unique integers のセットに含まれる各元素の total appearance_count を合計）とするか？
      
      // 最も標準的な意味: 
      // 「重複を除いた整数たち」に対して、それぞれの「個数」（＝出現回数を考慮せずに1カウント？）と「合計」。
      // しかし、「そのうち」という言葉は入力された値の中から選択をすることを指しうる。
      // A) unique numbers count (size), sum of those unique numbers. 
      // B) For each number in the input, after removing duplicates from the list context... ? No.
      
      // 最終判断：「重複を除いた整数」は Set に相当する。「それらの（Set の要素）について、個数」と言うのは Set の size と解釈するのが自然。Sum はその Set の和。もし count が元の出現回数の総和という意味なら「duplicate removed after counting」になるはずだが、「unique numbers about their counts' sum」など複雑な意味合いになりがちなので、A を採用する（count = 唯一の数たちの数）。
      // ただし、もし「個数を求める」という部分が「それぞれの整数の頻出率や出現回数の総和を考慮したもの」を含んでいるなら？ 
      
      let currentCountPerElement: Map<number, number> = new Map();
      for (const num of parts) {
        if (!uniqueSet.has(num)) { // 重複を除く処理はセットにのみ適用。各数についてカウントし、唯一の数たちの count と sum を求めるには... 
          uniqueSet.add(num);
          totalSum += num;
        } else {
            // この解釈：「duplicate removed integers」-> Set の要素たち。「それらの（集合）の個数と合計」。count = 1,2,3 -> cnt=3. sum=6. 
            pass;
        }
      }

      const uniqueNumbersList: number[] = Array.from(uniqueSet); // [unique numbers]
      
      let countValue = uniqueNumbersList.length;
      let totalSumValue = uniqueNumbersList.reduce((a, b) => a + b, 0);
      
      console.log(`count=${countValue} sum=${totalSumValue}`);
    } else {
        // 他の解釈の可能性："duplicate removed integers about count and sum" -> "unique elements' counts (as they appear once?) & their sums". 
        // または: original list processing, but skip duplicates. i.e., unique values only?
        
        pass; // 上記の論理を再確認。set を用いて一意な値のみを取り出し、count はその数え上げ（size）、sum は和とするのが最もシンプルかつ合理的。
    }

  } 
});

// もう一度考えてみる：もし「個数」が元のリストにおける出現回数の総和なら？例: [1,2,3] -> count=6 (if each appears once)? No. [1,1,2] -> unique=[1,2]. cnt? sum?.
