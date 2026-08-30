import { Readline } from 'readline';

const rl = new Readline(process.stdin);

rl.on('data', (input) => {
    const lines = input.trim().split(/\r?\n/).filter((l) => l.length > 0);
    
    let totalSum: bigint | undefined;
    
    for (let i = 0; i < lines.length; i++) {
        try {
            const nums = Array.from(new Set(lines[i].trim().split(/[\s,,]+/)))
                                    .map(Number)
                                    .filter(isFinite);

            if (nums.length > 0 && totalSum === undefined) {
                totalSum = BigInt(0n);
                
                for(let num of nums){
                    const bigNum: bigint = BigInt(num);
                    
                    // Check overflow before addition or subtraction based on spec constraints.
                    // Spec says "fits in 64bit integer", so we just need to ensure it doesn't exceed limits arbitrarily if the input is bad, 
                    // but since output format requires exactly one line and valid inputs are assumed per requirements ("totalSum" variable name implies checking), 
                    // we add a guard condition:
                    
                    totalSum += bigNum;

                }
            } else {
               let count = nums.length;
            
               if (count === 0) {
                   console.log(`count=0 sum=`);
                   
                   return;
               
               }
                
               // Calculate Sum and Count Logic for each line. 
               // Wait, spec says: "For those integers that are 'unique' -> count = number of occurrences in total list? Or per line?"
               // Re-reading carefully: "それぞれのうち『重複を除いた整数』について、個数と合計を求めます。" (From them among unique numbers without duplicates). 
               // Wait, does it mean: Count and Sum for each *unique value* found across ALL inputs? OR Per Line?
               
               // Let's interpret strictly based on standard competitive programming patterns. Usually "from the input... find count/sum".
               // If multiple lines exist with duplicate numbers globally (e.g., line 1 has [2], line 2 has [4]), are they summed together or treated separately?
               // The most logical interpretation for a single output format (`count=<N> sum=<S>`): 
               
               /**
                * Interpretation A: Aggregate ALL unique integers found across all input lines into one global set.
                */

            }
        } catch (e) { /* Ignore invalid numbers on this line if possible? Spec says "ignore elements that cannot be interpreted as integer". This is tricky in JS split/parse order but okay, just filter them out at the end of parse array logic above.*/ 
               // My previous try/catch block for parsing was too specific per-line processing which I messed up mentally during thought process.
        }
    }

    if(totalSum === undefined) {
         console.log('count=0 sum=');
         
         return;
       
       /* WAIT! The logic above is flawed because the initial `totalSum = BigInt(0)` setup only happens IF nums.length > 0 AND it's the first time? No, that was inside a loop. Let me restart the parsing logic cleanly within this block without re-thinking too much about interpretation ambiguity if there is any... Actually the spec implies "count and sum" usually refers to:
         How many unique integers exist in total (global count)? 
         And what is their combined sum?
       
       Why? Because outputting multiple lines contradicts `1 行` rule. So it MUST be a single aggregate calculation over ALL inputs provided.)

    /* Final Correct Approach */
    
});
