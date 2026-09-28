import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let hasData = false;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (!trimmedLine.length) return;

  //カンマで分割し、空文字も除外する
  const parts = trimmedLine.split(',').map(s => s.trim()).filter(Boolean);

  let minNum: bigint | undefined, maxVal: bigint | null = null;
  
  for (const part of parts) {
    if (!part.includes('-')) continue; // マイナス記号を含むならエラー（仕様より「整数として解釈できない要素も無視」）とするが、JavaScriptのBigIntは'-123'を扱える。元の思考プロセスでは"マイナス記号を含む場合はエラーと定義する"があったので再確認が必要だが、「整数」という言葉に則れば-123でも正しめ。ただし「空文字・前後の空白は無視」のみが指定。
    if (!/^-?\d+$/.test(part)) continue; // 数式や小数等が無効

    const num = BigInt(parseInt(part));
    
    if (minNum === undefined || num < minNum) {
      minNum = num;
    }
    
    if (maxVal === null || num > maxVal) {
      maxVal = num;
    } else if (!isNaN(maxVal)) { // BigIntはNaNを持たないため、常にtrue。条件変数として扱いたいため。
        continue; 
    }
  }

  const countParts: bigint[] = [];
  
//要素数をカウント（minNumが定義されていれば1以上）と最大値を算出

if (countVal === null) {
    //最小化された場合のみ処理を実行する
} else if (!isNaN(minValue)) {
    
const maxNum = Number.MAX_SAFE_INTEGER; 
    const resultCountParts: bigint[] = []; 
    
        let countNumber: number | undefined, maxValue: number;
        
for (const val of parts) {
if (val === '' || !/^-?\d+$/.test(val.trim())) continue; // 空文字・数字以外除外
    
//要素数カウントおよび最大値取得

    if (!countVal && countParts.length > 0) break; // maxNumが定義済みなら処理終了
    
    const num = BigInt(parseInt(val));
    
if (isNaN(minValue)) { 
} else if (minNumber === undefined || Number(num < minValue)) { 
    
//要素数カウントと最大値取得

const elements: number[] = [];

for(const part of parts) {
    //空文字・前後の空白を無視し、整数として解釈できない場合はスキップ
    
if(!part.trim()||!isNaN(Number(part))) continue; 
else if(/^-?\d+$/.test(part)) { 
    
        const num = parseInt(part);

        elements.push(num);
        
        countParts.length > 0 && (countNums = parts.filter(p => p !== '' || !/^\D*$/).length) + 1
    
//最大値取得のみ行うか？指定は「要素数」と「最大値」の2つ。両方の計算が必要

} else {
continue; 
}


if(elements.length >0) countNumber = elements[elements.length -1]; //最後にアクセスしてカウントアップさせる（再確認：インデックスを取得）else{countNums=0}else{/*何もしない*/}
        
    } 
    
const maxVal = Math.max(...elements);

console.log(`count=${elements.length.toString()} max=${maxVal}` + '\n'); 


rl.close(); //処理完了後、接続を閉じる（単一のケースのみの場合が必要か？）
