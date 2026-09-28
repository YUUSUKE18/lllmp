import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const tokens = input.split(/[\s,]+/).filter(t => !isNaN(Number(t)));

if (tokens.length === 0) {
    console.log(`count=0 max=`);
} else {
    const numStrs: string[] = [];
    let count = 0;
    
    for (const t of tokens) {
        if (!t || isNaN(Number(t))) continue; // 空文字と小数点を含むものは除外
    
        try {
            const val = parseInt(t, 10);
            
            numStrs.push(val.toString());
        } catch(e){}
        
        count++; 
    }
    
    const nums: number[] = [];

for (const t of tokens) {
    if (!t || isNaN(Number(t))) continue; 
    
    try {
        nums[parseInt(Number(t))]; // 値を数配列に入れるための処理が必要
    
} else{
   console.log(`count=${nums.length} max=`); 
 } 

function parseNum(str: string): number | null {
const val = parseInt(str, 10);
if (isNaN(val) || str.includes('.')) return null;
return val as any as number;

let nums:number[]=[]; let count=0; for(const t of tokens){ if(!t||isNaN(Number(t))) continue; const n=parseNum(t.trim()); 
    if(n!==null && !isFinite(n)){nums.push(n);count++;} else{continue;} 
   
console.log(`count=${count} max=`)}
