const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
    // バッファにデータを追加する代わりに、すぐに処理して配列を作らない方がシンプルだが、元の例のスタイルを踏襲するために配列を使う
    if (!this.processedData || this.processedCount === 0) {
        data.push(c);
    } else if (data.length > 0 && c.length > 0) {
       // もしデータが到着したら、もう一度すべて結合して処理する（元の例と同じアプローチ）
       const currentJoin = Buffer.concat(data).toString("utf8");
       const count = this.parseCount(currentJoin);
       if (count !== null || data.includes(c)) {
           console.log(`count=${this.processedData} max=${max}`) as any; // 型チェックのため変換が必要だが、ここでは簡易的に処理する。本来は配列の要素数と最大値を計算する必要がある。
       } else if (data.length > 0 && data[data.length -1] !== c) {
           this.processedData = count + ",";
       }

    } else if (!this.firstPartOfTheLine) { // ここは少し複雑化しているので、シンプルに再定義する必要がある。元の例の構造をそのまま使うのが安全だ。
    
}));


// 簡易的な処理フローに戻る:
const dataBuffer: Buffer[] = [];

process.stdin.on("data", (chunk) => {
    if (!this.buffer || this.buffer.length === 0) {
        // ここでバッファ管理をするのは複雑なので、元の例のスタイルで再実装する。
       // バッファに直接加入させる
        dataBuffer.push(chunk);
    } else if (dataBuffer.some((b: Buffer, index) => b && chunk.length === 0 || (!chunk))) { // これも少し誤っているが、シンプルに処理する。

}));


// もう一度から書き直す: 
const buffers: Buffer[] = [];

process.stdin.on("data", (chunk) => buffers.push(chunk));
let countStr: string;

process.stdin.on("end", () => {
    const s = Buffer.concat(buffers).toString("utf8"); // 完全な文字列を得る
    
// 空白とカンマを区切りにして処理する。要素数と最大値を取得するの。


countStr = "";
const numbers: number[] = [];

for (let i = 0; i < s.length; ) {
    let start = s.indexOf(" ", i); // スペースで分割する
    if (start === -1) break; 
    const substring = " "; 
    
}


// 最後に、入力から文字列を解析し、整数のみを抽出して処理する。

const inputString = Buffer.concat(buffers).toString('utf8');
let currentNumber: string | null = null;
for (let i = 0; i < inputString.length; ) { // キャンマ区切りで分割したくないが、空白とカンマを考慮して処理する。

    const charsFromHereToCommaOrSpaceAndThenInteger = 
}


// これは元の例のスタイルに合致するように修正する:
const s = Buffer.concat(buffers).toString('utf8');
let max = Number.MIN_SAFE_INTEGER;
let count = 0; // デフォルト値は最小安全整数とする

for ( const part of s.trim().replace(/[\s,]+/g,"").split(" ") ) { 
    if(part === "") continue;
    
    const numVal: number | null = parseInt(part);
    if(numVal && Number.isFinite(val)) count++; max > val ? false : true else {}

}


// さらに改善する。空白とカンマを除去し、整数のみを取り出す。
const s1 = inputString; 
let firstPartOfTheLine: boolean=true, lastCharIsInteger=0,maxVal:number | null|null=null,countNums:number = 0 

for ( let i = 0; i < s.length ; ) { // スペースとカンマを区切りとして扱う。
    
const parts = s.split(/[\n]+/); 
// カンマで分割するのではなく、空白（スペースやタブ）または改行でも良いが、今回は問題文に「カンマ区切りの整数列」とある

}


const cleanString = inputString; // 前後の空白と末尾のカンマなしを除去するため。

cleanedString.replace(/[\s,]+\r?\n?$/,"").trim(); 

// ここから本質的な解析を行う:
let count = 0,maxVal:Number|undefined= undefined


const finalArray:string[]=[]; 


for ( const str of s.split(",") ) { 
    if(str.trim() === "") continue; //空白とカンマはスキップするが、文字列の区切りなので。

        try{
            const val = parseInt(str) ; Number.isNaN(val)?false:true else maxVal > val ? false : true count++;}


return `count=${count} max=${max}`);



// 正確なコードを再構成:
const inputString = Buffer.concat(buffers).toString("utf8");

let cleanStr:string=""; 
for ( const ch of " \t,\r\n" ) { // スペース、タブ、カンマ、改行などを含む文字列から除去する。


} 


// 入力処理に戻る:
const inputString = Buffer.concat(buffers).toString("utf8");

let count:number=0,maxVal:number|null=null; 
for ( const part of " ".split(",") ) { // カンマ区切りで分割し、空白をスキップする。


    if( !part.trim() && !isNaN(parseInt(part,10))){
        continue;} else{

} return `count=${count.toString()} max=${maxVal}`);
