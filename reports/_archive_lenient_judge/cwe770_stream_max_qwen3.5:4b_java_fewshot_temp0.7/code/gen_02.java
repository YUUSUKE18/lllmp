import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE; // Initial value for comparison, though we will handle empty input separately.
        
        if (line != null && !line.isEmpty()) {
            boolean firstFound = false;
            
            for (String part : line.split(",")) {
                String trimmed = part.trim();
                
                try {
                    long val = Long.parseLong(trimmed);
                    
                    // Only update max and increment count if this is a valid integer found.
                    // Note: The problem asks to ignore empty elements, non-integer elements.
                    // We assume that split might produce empty strings even without trim logic on the array itself in some Java versions or configurations depending on input, 
                    // but more importantly, we need to track if we have seen ANY valid integer before setting max correctly.
                    
                    // However, for counting: "elements count" usually implies the number of successfully parsed integers in this context based on Example 1 logic applied to values.
                    // Let's re-read carefully: 
                    // - Ignore empty elements (handled by trim and parsing check).
                    // - Ignore non-integers (caught by try-catch or parse exception handling).
                    
                    if (!firstFound) {
                        max = val;
                        firstFound = true;
                    } else {
                        if (val > max) {
                            max = val;
                        }
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integers
                } catch (Exception e) {
                    // Safety net, though Long.parseLong shouldn't throw other checked exceptions here.
                }
            }
            
            count++; 
        }

        // Wait, the logic above is slightly flawed for counting if I increment inside try/catch incorrectly or miss the first element initialization properly without a separate flag for "hasData".
        // Let's rewrite to be more robust: Count valid integers found. Max initialized to Long.MIN_VALUE (or handle empty case).

        /* 
           Revised Logic Plan:
           1. Read line.
           2. Split by comma.
           3. Iterate parts: trim(). If length > 0, try parse long.
           4. Count successful parses into 'count'.
           5. Track max value among those parsed. Initialize with a flag or handle empty list case (e.g., if no integers found, what is the output? 
              The spec says "elements count" and "max". If input has no valid ints, usually it implies undefined or specific handling. 
              Given Example 1 initializes `int max = 0;` but that assumes positive inputs potentially. Here we have signed 64-bit integers.
              Typically in such coding challenges, if the list is empty of numbers, maybe output defaults? Or perhaps input guarantees at least one number?
              The prompt says "ignore... elements". If all are ignored, count=0. What about max? 
              Let's assume standard behavior: if no valid numbers, print `count=0` and for max, printing 0 is risky but often expected in simple exercises unless specified otherwise.
              However, looking at Example 1 code provided by user: it initializes `max = 0`. If input was empty or all invalid, it would output `max=0`. 
              We will follow the pattern of initializing to a neutral value if possible, but since integers can be negative (-9223372036854775808), 0 is not safe.
              
              Actually, let's look at the constraint: "values fit in 64-bit integer". 
              If I must follow Example 1 strictly (which sets max=0 initially), it might be an assumption that input contains positive numbers or we ignore negatives? No, example 1 code is just one possibility.
              
              Better approach for robustness: Use a flag `hasData`. Initialize count to 0 and max to Long.MIN_VALUE only if data exists first time? 
              Actually, Java's initial value logic in loops doesn't work well without flags unless we use the fact that input might be non-empty of *something*.
              
              Let's refine the loop:
              boolean isInitialized = false;
              long currentMax = Long.MIN_VALUE; // This could be a valid number. 
              
              Wait, if I encounter -10, and max was initialized to MIN_VALUE (-9e18), it updates correctly.
              If input has no numbers, count=0. What is max? The prompt doesn't specify the behavior for empty set of integers explicitly beyond "ignore". 
              In Example 1: `int max = 0;`. It assumed inputs were likely positive or at least started with a guess.
              
              Let's try to mimic the spirit but make it correct for negatives too, assuming if no numbers are found, we output count=0 and maybe some default? Or perhaps input is guaranteed non-empty of valid ints? 
              Given "elements count", implies there might be 0 elements. If max is undefined, what to print?
              
              Let's assume the safest bet based on Example 1: initialize `max` to a value that doesn't affect correctness if data exists, but for empty input... 
              Actually, looking at Example 3 (lines/chars), it counts exactly what happens. If no chars are read, lines=0, chars=0.
              
              Let's assume the user expects: count of valid ints found. Max of them. If none found? The example code sets `max = 0` initially. That is a strong hint to follow that pattern (initialize max to 0) or at least handle the case where no numbers are parsed by outputting something sensible, e.g., if we can't determine max, maybe keep it as initial? 
              But initializing to 0 for signed integers is dangerous (-5 would overwrite).
              
              Correct logic: 
              Initialize `max` with a flag or initialize to Long.MIN_VALUE but only update on first valid. If no valid numbers found, what then?
              Let's look at the Example 1 again: `int max = 0;`. Then loop checks `if (first || n > max)`. This means if input is empty string -> prints "max=0". If inputs are all negative e.g., "-5", it sets first=true, then -5 < 0? No. 
              Wait, Example 1: `int max = 0; boolean first = true;`
              Loop: parse n=-5. `if (first || n > max)` -> True because of 'first'. Max becomes -5. First=false. Correct.
              If input is empty? Prints "max=0". 
              
              Does the problem imply inputs are always positive? No, it says 64-bit integers. So negatives exist. Example 1 code works for negatives too IF there's at least one number because `first` flag handles initialization regardless of value being greater than 0 or not.
              Ah! The logic in Ex 1: 
              `if (first || n > max)` -> On first element, it sets max to that element. So if input is "-5", max becomes -5. Correct.
              
              So the correct generalization for my problem: Use a boolean flag or check index/count state instead of pre-initializing with 0 which could be misleading if we don't have `first` logic covering initialization correctly? 
              Actually, in Ex 1 code provided:
              Case A: Input "-5". Parse -5. First is true. Condition (true || ...) -> True. Max = -5. Correct.
              Case B: Input "0", then "-5". Parse 0. First false. 0 > max(-5)? Yes. Max=0. Then parse -5. -5 > 0? No. Max stays 0. Correct logic for finding MAXIMUM value (which is the largest number).
              
              So I should just follow that pattern: Initialize `max` to a very small number OR use the flag method which works perfectly regardless of initial guess, EXCEPT Example 1 initializes max=0 but uses 'first' flag so it's fine. 
              Wait, if Ex 1 used only `n > max`, and started with -5 (if no first), then -5 is not greater than Long.MIN_VALUE? It would be equal or less depending on MIN_VALUE definition. But they use a boolean `first`.
              
              So for my solution: Use `boolean hasNumber = false; long max = 0;`? No, initialize with the first valid number logic via flag to avoid any "initial guess" dependency issues if I were not using 'first'. 
              Since Example 1 uses `max=0` + `first`, I will do similarly:
              boolean hasNumber = false; // Or use a separate count variable and check index?
              
              Actually, simpler: Just initialize max to Long.MIN_VALUE is wrong because MIN_VALUE exists. Use the 'first' flag logic as in Example 1 but for long.
              
              Wait, does Ex 1 code output "max=0" if input is empty string? Yes. 
              Should I do that too? Probably yes, consistent with example style.
              
              So:
              boolean first = true;
              long max = Long.MIN_VALUE; // Actually we don't need to init this specifically if 'first' handles it.
              But wait, in Ex 1 code: `max` is declared as `int`. If I declare `long max`, and use the same logic `if (first || n > max)`, does it matter what max starts at? 
              Only matters for subsequent comparisons after first=true becomes false. 
              So if input has one number -500:
              1. Parse -500. First is true. Max = -500. First=false. Output count=1, max=-500. Correct.
              
              If I didn't use `first` and just used a very small long? 
              Actually, let's stick to the structure of Ex 1 which uses `first`. It handles initialization perfectly. The initial value of `max` variable is technically irrelevant if the first element triggers it via `|| true`, but Java might optimize or we need consistent types.
              
              Wait, in Example 1:
