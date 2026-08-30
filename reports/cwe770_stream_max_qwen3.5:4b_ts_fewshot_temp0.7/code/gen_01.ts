const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const ch of s) if (ch === ",") continue;
  
  //カンマ区切り処理を正規表現で行う方が簡潔で、空白の扱いも容易である。
  const parts = s.split(",").map(x => x.trim());

  let currentMax: number | null = null;
  for (const part of parts) {
    if (!part || !/\d-/.test(part)) continue; //空文字列や整数でないものをスキップ
    
    const valStr = parseInt(part, 10);
    
    // NaNチェック（例：'abc' または '3.5') が含まれる場合）
    if (isNaN(valStr)) continue;

    count++;
    currentMax = maxVal === null || valStr > maxVal ? valStr : maxVal;
  }

  const finalMax = currentMax ?? 0; //空のリストの場合、最大値は定義上存在しないが問題文の例からデフォルト処理が必要か。 
                                    //ただし「整数列」と明記されているため、何らかの要素があることが前提とされる場合が多いが、
                                    //安全のため null を返すか 0 で扱う。元のコード参照を見ると `max` の初期値は 0 と設定されていた。
    
  console.log(`count=${count} max=${finalMax}`);
});

//上記ロジックを再構成しより正確に実装する。
const s = Buffer.concat(data).toString("utf8");
let count = 0;
let maxVal: number | null = null; //初期値は要素がない場合の扱いにするが、例1では `first` フラグを使っている。

//再計算：厳密な実装
count = 0; 
maxVal = -Infinity / 2; //64bit整数範囲外に設定する（最小値より小さい）
let first = true; 

const parts = s.split(",");
for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || !/\d-/.test(trimmed)) continue;

    try {
        const n = parseInt(trimmed, 10); //厳密に整数チェックが必要か？ `parseInt` は非数値部分があると停止する。
                                          //例: "3a" -> 3. しかし「整数として解釈できない要素も無視します」なので、
                                          //完全な数字である必要がある場合もあるが通常は引数の先頭のみで良いことが多い。
                                          //しかし `parseInt` は左から数えるので `"12abc"` は `12` になる。 
                                          //問題文「整数として解釈できない要素も無視します」→ "3a" は整数ではない？ 
                                          //通常は leading/trailing non-digits を含む場合は除外すると考えるが、
                                          //例2のテキスト処理では単純なトークン分割が行われているため、ここでは `parseInt` で良いと判断する。

        if (isNaN(n)) continue; 

        count++;
        
        const isMax = first || n > maxVal as number; 
        if (isMax) {
            //maxVal を更新する際の問題：NaN 処理が必要か？
            //最初の要素は最大値になる可能性が高い。
            
            let val: number;
            try { val = parseInt(trimmed,10); } catch(e){}

            if (!isNaN(val)) maxVal = Math.max(maxVal as number | undefined || -Infinity/2, val); 
        } else { //max 更新ロジックを簡略化：直接比較して保存
             const currentMaxCandidate = parseInt(trimmed,10);
             if (currentMaxCandidate > maxVal) {
                 maxVal = currentMaxCandidate;
             }
        }

    } catch(e){} 
}

//修正版ロジックを再実行：
count = 0;
maxVal: number | null = null; //初期化
let firstElementFound = false;

for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || !/\d-/.test(trimmed)) continue; //空白や整数でないものをスキップ
    
    try{
        const n = parseInt(trimmed, 10); 
        if (isNaN(n)) continue;

        count++;
        
        if (!firstElementFound) {
            maxVal = n as number;
            firstElementFound = true;
        } else {
            //64bit int の範囲に収まることを前提として、単純比較で OK. 
            const currentMaxCandidate = parseInt(trimmed,10);
             if (currentMaxCandidate > maxVal) {
                 maxVal = currentMaxCandidate as number;
             }
        }

    } catch(e){} //整数でない場合はスキップ済みのためエラーなしと仮定
}

//空の場合の処理：例1では `max=0` となる。この仕様も同様に適用する。
if (firstElementFound) {
   console.log(`count=${count} max=${maxVal}`); 
}else{
    //要素がなかった場合、最大値は定義されていないため、例1のようにデフォルトを返すか？
    //問題文「整数列」とあるので空でないことが多いが、安全策として 0 とする。
    console.log(`count=${count} max=0`); 
}

//最終的に一度に出力するための再構築コード：
