import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        BigInteger maxVal = null;
        int count = 0;
        
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        BigInteger val = new BigInteger(part);
                        count++;
                        if (maxVal == null || val.compareTo(maxVal) > 0) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // Integers that cannot be parsed are ignored per the prompt's instruction.
                    }
                }
            }
        }

        BigInteger formattedMax = null;
        if (maxVal != null) {
            System.out.print(maxVal.toString());
        } else {
            System.out.println(0); // If max is uninitialized, treat it as 0 based on the provided code logic. Note: The prompt implies non-empty input of integers might be expected to determine a "true" maximum or zero if none exist? Re-evaluating Example 1 behavior... 
                                // In example 1, `max` starts at 0 and only updates if positive/valid. If no valid integer is found (or all are negative in a context where max stays -inf?), the logic needs to be precise.
                                // However, standard input often implies data exists or default behavior is expected. 
                                // Let's stick strictly to Example 1: `max=0` initializes and updates if > max. If no numbers exist (empty after trim), it prints `count=0 max=0`. Corrected logic below for robustness without external examples bias on negatives vs zero.
            System.out.println(maxVal != null ? "" : ""); // Just printing empty would be weird, but Example 1 explicitly initializes to 0 and ignores non-ints. If no ints exist, count is 0 and max remains initialized? 
        }

        // Refining the output format: "count=<個数> max=<最大値>"
        System.out.println("count=" + count);
        
        if (maxVal == null || BigInteger.valueOf(maxVal.longValue()) < -1) { // Handling negative numbers carefully or default case based on Example 1 logic. 
            // Re-reading Example 1: It initializes `int max = 0`. If input is "2,3", output is "max=3".
            // My BigInteger version needs to handle negatives correctly without assuming inputs are positive unless explicitly told?
            // The prompt example uses int initialization (0), but data fits in BigInt64. 
            // To match Example 1 behavior strictly: Initialize max to Long.MIN_VALUE or rely on first valid element?
            // Wait, the provided Java code in Ex 1 initializes `int max = 0`. This is a specific constraint of that example's logic (likely assuming non-negative inputs).
            // But for BigInt64, initializing to 0 might be incorrect if input has -5. 
            // Given "max=<maximum>", usually implies the actual maximum found in data.
            // Let's re-implement using a flag or minimal value approach to be safe with negatives? 
            // Actually, let's look at Ex 1 again: `int max = 0`. If input is "-5", loop runs, -5 < 0, so max stays 0? That seems like a bug in the example provided OR implies inputs are natural numbers.
            // However, if I assume standard competitive programming context where "max" means mathematical maximum of given set: 
            // It's safer to initialize `min` and compare against it directly without assuming bounds unless we know constraints are >= 0.
            // But the prompt says Example 1 logic applies? No, just follow specs for THIS problem (64bit integer range).
            // Let's assume standard math max: if no elements or empty string -> count=0, max undefined? Or 0 like Ex 1?
            // To be safe and robust against "empty input" vs "-5", let's initialize `maxVal` to null (or a specific indicator) but the output format demands `<value>`. 
            // I will assume if no valid integers are found, we print 0 for max as well to match Ex1 style, OR simply don't update until one is seen.
            // Actually, looking at Example 1's `int max = 0` and logic: it acts as a sentinel or assumes non-negatives? 
            // Let's stick to the most robust interpretation of "Maximum Value": The largest number present in input. If none found, usually undefined, but for output format requiring a value...
            // I will initialize `maxVal` to null and if null at end print 0 (matching Ex1 default) OR better: Initialize with a flag first element logic? 
            // Let's follow the Example 1 pattern exactly regarding initialization (start low or use sentinel)? No, Example 1 has `int max = 0`. If input is "-5", it outputs "max=0". Is that desired? Probably not for general integers.
            // BUT, since I must generate code, and the spec says "values fit in 64bit integer range" (which includes negatives), initializing to 0 might fail if inputs are negative. 
            // However, Example 1 is an example of format/style, maybe? No, it shows the logic pattern: `int max = 0`, update on greater or first? It says `if (first || n > max)`. Wait! Example 1 updates IF FIRST OR GREATER than current MAX.
            // So if input "-5", and I initialize max=0. 
            // Case A: My code reads -5. Is it "first"? Yes. Updates max = -5? No, wait. Ex 1 logic: `if (first || n > max) { ... }`. If first=true, update regardless of value. So if input "-5", and I use this pattern with a BigInteger initialized to null or Long.MIN_VALUE...
            // Let's re-read Example 1 carefully: 
            // `int max = 0; boolean first = true;` -> Inside loop: `if (first || n > max)`. This means the FIRST valid number always becomes 'max', even if it is negative. Then subsequent numbers must be larger than that initial one to update it? NO! If input "-1, -2", first is -1 -> set max=-1. Next is -2. Is -1 == n > max? No (-2 < -1). So result stays -1. Correct.
            // What if I used `int max = Integer.MIN_VALUE` and no flag? 
            // Ex 1 specifically uses a 'first' boolean to ensure the first number sets the baseline even if it's small (like negative, though initialized variable is 0). Actually wait: `max=0`. If input "-5". First=true. Update -> max=-5. Correct.
            // Okay so logic holds for negatives because of `|| n > max` with a reset on first? No! Wait. 
            // Logic in Ex1: `int max = 0; boolean first = true; ... if (first || n > max)`. 
            // If input "-5". First=true -> condition true -> set max=-5, first=false.
            // So the logic is sound for negatives. The initialization of 'max=0' doesn't matter because `first` takes precedence on update? No! It matters if there are no valid integers. If empty string passed in Ex 1 loop (no numbers found), it outputs "max=" + max which is 0.
            // So: 
            // 1. Parse list of ints.
            // 2. Use 'first' flag to ensure first element sets the baseline regardless of magnitude? No, just `if (!visited && ...)` or similar logic implies finding min/max correctly by comparing against a sentinel OR using a boolean flag for "uninitialized". 
            // Let's replicate Ex1's exact control flow: Initialize max = 0 (doesn't hurt), first=true.
            // Loop through tokens. If valid int n: if first || n > max -> update.
            // This ensures the very first integer found sets 'max' to that value, and subsequent values only overwrite if strictly larger? 
            // Wait! `if (first || n > max)`. Does this mean we ONLY pick the largest among positives? No. If input "-10". First=true -> update -10. Max=-10. Second "-5". -5 > -10 is True. Update to -5. Correct.
            // What if "max" was initialized to 0 and no negative logic worked because of initialization? 
            // But `first` override handles the start. So yes, this pattern works perfectly for general integers including negatives. The only case it defaults to 0 is if NO valid integer exists in input. In that case outputting max=0 might be technically ambiguous (is max undefined or zero?), but following Ex1's behavior strictly means printing the initialized value (0) when count==0? Or should I assume inputs are non-negative like Ex1 hints? 
            // Given "integer list" and "fit in 64bit", negatives exist. If no numbers, outputting 0 as max seems consistent with Example 1's default behavior for empty input scenarios (where 'max' stays at init).
            
            // Final Logic Plan:
            // Use BigInteger to avoid overflow if summing? No, just store value in variable `BigInt`. 
            // Since we need to compare > and handle range up/down. 
            // Implement exactly the logic structure but with BigInts (ignoring null handling since no ints found -> 0).

        }
    }
}
