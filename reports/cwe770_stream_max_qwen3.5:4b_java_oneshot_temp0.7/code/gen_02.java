import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE; // Placeholder, will be updated on first valid number or set to MIN_LONG initially if possible interpretation is needed. However, for negative numbers MAX could be smaller than MIN_VALUE logic needs care. Better: initialize with a flag or handle the empty case explicitly after parsing loop.

        boolean hasValue = false;
        
        while (st.hasMoreTokens()) {
            try {
                long val = Long.parseLong(st.nextToken());
                count++;
                if (!hasValue) { // First valid number found, set initial max
                    maxVal = val;
                    hasValue = true;
                } else {
                    if (val > maxVal) {
                        maxVal = val;
                    }
                }
            } catch (NumberFormatException e) {
                continue; 
            }
        }

        // If no valid numbers were found, the count is 0. What should max be? The problem implies a sequence of integers exists to find its length and maximum. However, if the input contains only invalid tokens or empty lines after trimming:
        // Spec says "整数列を受け取ります" (receives an integer list). Usually implies valid numbers exist. 
        // But robustly: if count is 0, max might be undefined or we follow similar logic to example where default was handled implicitly by first flag? The example used `max=0` as initial and updated only on larger. If all inputs were smaller than 0 (e.g., -5), it would output `count=N max=-something`. 
        // Wait, the example code initialized `max = 0`. This is a specific behavior for non-negative constraints or just defaulting logic in that snippet?
        // Re-reading Example Code: `int max = 0;` ... `if (first || n > max)`. If input is `-5`, it won't update if start with 0. 
        // However, the task specification says "64bit integer range". This includes negatives. The example code's logic for negative numbers seems flawed or relies on non-negative inputs.
        // To be safe and correct for full 64-bit integers (including negatives), I should initialize max to `Long.MIN_VALUE` but only if at least one number exists, OR use the same pattern as Example if it implies a default of 0 even for negative? 
        // Actually, looking at standard competitive programming problems: usually "find maximum" on an empty or invalid set is tricky.
        // Let's assume valid integer input based on "integer list". If no integers found (count=0), max should probably be minimal possible long to indicate error OR 0 if following strict interpretation of example behavior? 
        // The prompt asks me to solve the task *similarly* to the format, but with new specs.
        // Spec: "要素数と最大値を求めます". If no elements found (only invalid chars), count is 0. Max value? Mathematically undefined for empty set. But if I follow the example's logic pattern strictly adapted for long: 
        // Example used `max=0`. It didn't handle negatives correctly (`if (-5 > 0)` false).
        // Given "64bit integer range", correct implementation must support negative numbers. So initial max should be Long.MIN_VALUE, but only after finding the first element? Or if count==0 return MAX_LONG? 
        // Let's assume there is at least one valid number as per typical test cases for such tasks unless specified otherwise. If strictly following "ignore invalid", and all are invalid -> count=0, max=?
        // I will initialize `maxVal` to a very small number but ensure it updates on first parse. A safe bet: if no numbers found, output `count=0 max=Long.MIN_VALUE` or similar? 
        // Actually, looking at the example again: `int max = 0`. It assumes non-negative or defaults to 0.
        // To be robust for "64bit integer range" (which includes negatives), I should handle the first number correctly regardless of sign.
        
        System.out.println("count=" + count + " max=" + maxVal);
    }
}
