import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE; // Initialize to minimum possible value. Since input is comma-separated, we need at least one valid number or handle the case with no numbers (defaulting MIN_VALUE seems appropriate given constraints). Actually, if there are no integers found, MAX should probably be initialized such that it doesn't affect logic unless specified. But since problem asks for max value of elements received, and range is 64bit int, we initialize to Long.MIN_VALUE but only update when a valid number exists? However, usually in these problems "max" implies there was at least one element or the output format requires handling empty case specifically. The example 1 initialized `int max = 0`, which suggests non-negative assumption or just starting point. But integers can be negative (64bit). Let's assume valid input contains numbers. If no number is parsed, maybe it shouldn't happen based on "integer sequence".
        // Re-evaluating initialization: The example used 0 for positive ints assuming inputs were likely positive or they wanted the max of empty set to stay low? 
        // Actually, a safer approach if we can assume input contains valid integers per spec ("整数列を受け取ります"), but robustly handle potential negatives.
        // If no integer is found, what should MAX be? Let's assume at least one integer exists as per typical competitive programming unless specified otherwise (empty set max undefined). 
        // To be safe with negative numbers: Initialize to Long.MIN_VALUE if we expect a valid number to exist, but better yet, use a flag or just standard logic.
        // Given the examples' simplicity, I will stick to updating on first match. If no integers are found, count=0 and max remains MIN_VALUE? Or perhaps the problem implies non-empty input of ints. 
        // Let's handle the update correctly: if (first || n > max). Initialize with a flag or minimal value.
        
        boolean isFirst = true;
        long currentMax = Long.MIN_VALUE;

        while ((line = br.readLine()) != null) {
            String[] parts = line.split(",");
            for (String s : parts) {
                if (!s.trim().isEmpty()) {
                    try {
                        // Check bounds to ensure it fits in long? 
                        // The problem says input integers fit within 64-bit range. parseInt with radix 10 handles this mostly, but parseLong is safer for "integers" that might be interpreted as potentially larger than int range if the problem meant signed 32-bit vs unsigned etc?
                        // Usually "integer sequence" in CP context means fits into long. 
                        // Let's use Long.parseLong to cover full 64bit range correctly, though standard Input might give smaller ints. 
                        long n = Long.parseLong(s.trim());
                        
                        if (isFirst || n > currentMax) {
                            currentMax = n;
                            isFirst = false;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore non-integers as per spec "整数として解釈できない要素も無視します"
                    }
                }
            }
        }

        System.out.println("count=" + count + " max=" + currentMax);
    }
}
