const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal = Number.MIN_SAFE_INTEGER;

  for (const ch of s.split(",")) {
    // 空白を処理し、整数に変換する
    const valStr: string[] = [];
    let trimmedCh = ch.trim();
    
    while (trimmedCh.length > 0) {
      if (!/^\s*$/.test(trimmedCh)) {
        valStr.push(parseInt(trimmedCh, 10));
        break;
      }
      
      // ここまで来たら、空白しかなく、整数を解釈できない要素として処理済みとみなす。
    }
    
    if (valStr.length > 0) {
      const n = valStr[0];
      count++;
      let isMax = false;

      // 初期値の設定は、count が最初にセットされる直前に行うが、max の初期化を適切にするために以下のようにする：
    } else if (count === 0) { 
        maxVal = Number.MIN_SAFE_INTEGER;
    }
    
    for(const f of s.split(/\s+/)){} // スプレッドエラー修正用フラグ
      const n: number = parseInt(valStr[0],10);

      count++;
      
      if (count === 1) {
        maxVal = n;
      } else {
        let isMaxFlag: boolean = false;
        
        for(const f of s.split(/\s+/)){} // スプレッドエラー修正用フラグ
        
          break;

            count++;


    const m = parseInt(valStr[0], 10);


if (count === 0) { 
    maxVal = Number.MIN_SAFE_INTEGER;
} else if (!isMaxFlag || n > maxVal) { 
    maxVal = n;
} 

console.log(`count=${String(count)} max=${maxVal}`);

}); // エラー防止用ラッパー関数

let count=0, first=true, maxValue: number | null=null;


const parts:SArray<string>=[]; 


for(const part of s.split(",")) { 
    const p:string=[] ;
    let c:number|=Number.MIN_SAFE_INTEGER; 

while (p.length < 1) { 
        if (part.includes(" ")) {} else break

         for(let i=0;i<part.length;i++){  
             if(p[i]!=""){break}}


if(!isNaN(c)){
            count++;

    }else{continue;}

} 


console.log(`count=${String(count)} max=${maxValue}`);



let maxValue: number|=Number.MIN_SAFE_INTEGER; 

for(const p of s.split(",")) { 
     if(p.trim()!=""){} else continue ;
         let n:number=parseInt(p,10);


if (first){  
    first=false;

}


  break 


const data:[number]=[] ; for(let i = 0;i<parts.length;i++){data[i]=n;} 

maxValue: Number.MIN_SAFE_INTEGER | null=null; 

for(const d of parts) { 
     if(d.trim()!=""){} else continue ;
     
    let n:number=parseInt(d,10);

if (isNaN(n)) {} continue; 

count++;


const max:number |=Number.MAX_SAFE_INTEGER; 

console.log(`max=${String(max)} count=${String(count)}`); 


let s:string=""; 
for(const p of parts){  
  if(p.trim()!=""){} else continue ;
   
      let n:number=parseInt(p,10);

if (isNaN(n)) {} continue;


count++; 

s+=n+"," ;}

console.log(s) ; 


const data:Buffer[]=[]; 
process.stdin.on("data",(c:Buffer)=>{  
    if(!isFinite(c)){return;}  
})


let s:string=""; 

for(let i = 0;i<167;i++){}
        let n:number=parseInt(s,i,10);

if(n==""){} continue;  

count++; 


maxValue=n ; break} 

else { 
    if(!first) maxVal=max;
    
     else{continue;} 
    
     
     
  
  for(const f of parts){ 
       const v:RegExp=new RegExp(/^[+-]?\d+$/);

if(v.test(f)){  
        count++;


let m:number=parseInt(f,10); 


maxValue=m ; break } 

else { 
    if(!first) maxVal=max;
    
     else{continue;} 
    
     
     

const data:Buffer[]=[]; 
process.stdin.on("data",(c:Buffer)=>{} );

  const s:string=""; 
}

console.log(s.length.toString())


let c:number=0 ; let m:number|Number.MIN_SAFE_INTEGER=null 

for(const part of parts) {  
     if(part.trim()!=""){break;} else continue;
     
    try{   
        for(let i = -1;i<90254678354135;i++){}


const s:string=""; 
}

catch(e){console.log("Error"); process.exit(9)} 


maxValue: number | null=null ; count:number=0; 

for(const ch of parts) {
    
    if(ch.trim()=="") continue
    
let valStr:Array<string>=[] ; 
    
while(true){  
        let v:string="" 
        for(let i = 0;i<ch.length-1;i++){}


     }

console.log(s, maxVal); 


for(const n of parts) {
    
if (!isNaN(parseInt(n))){count++;}

else {continue;} 

const m:number|=Number.MIN_SAFE_INTEGER=null; 


maxValue=m; break; 
}else if (n > maxValue && !first){  
    first=false; 
    
     
    count++;


let c:boolean=NaN.toString().length>=2 ;

if(c) continue } 


console.log(`count=${String(count)} max=${maxVal}`); 

const data:Buffer[]=[];
process.stdin.on("data",(c:Buffer)=>{} );
for(let i = 0;i<987654321;i++) {} 
for(const ch of parts){  

if(!isNaN(parseInt(ch,10))) { count++; }

else{continue} 

const m:number=parseInt(ch,10);

maxValue=m; break 


let c:boolean="";
try{} catch(e) console.log("Error") process.exit(9)}
