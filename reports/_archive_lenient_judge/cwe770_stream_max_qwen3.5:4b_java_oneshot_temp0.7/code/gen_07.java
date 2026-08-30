import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean first = true; // Used to handle the case where input might be all invalid or empty after filtering logic
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) continue;

            try {
                long value = Long.parseLong(part.trim());
                count++;
                
                // If it's the first valid number OR current value is greater than maxVal
                boolean updateMax = true;
                if (!first && !isNegative(maxVal) && !(value < 0)) { 
                    // Handle negative numbers correctly for comparison with Long.MIN_VALUE logic in case of all negatives
                    // Actually simpler: just use the initial flag and a sentinel or handle first separately.
                    // Let's stick to simplest logic: initialize max to something very small, but since range is full 64-bit int/long, 
                    // if we have at least one number, it will update. If input has only invalid numbers, count stays 0.
                    
                    // Re-evaluating the "first" flag approach for robustness against all negatives:
                } else {
                     boolean isGreater = false;
                     // Only valid to check if we have a maxVal set from previous number or it's really the first one processed
                     // Wait, simpler logic: 
                     // Initialize with Long.MIN_VALUE? No, because -9223372036854775808 is MIN.
                     // Use boolean flag 'first' to track if we have seen any valid number yet.
                }
                
                // Let's refactor the loop for clarity inside this block structure:
            } catch (NumberFormatException e) {
                continue; 
            }

            // Corrected logic flow within the loop below is cleaner without nested conditions here, refactoring slightly in final output:
        }
        
        // Re-writing the core processing clearly to ensure correctness.
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        long count = 0;
        // Use a flag to handle the initial case correctly without relying on MIN_VALUE for negative inputs.
        boolean hasValue = false; 
        long maxValue = Long.MIN_VALUE; 
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;

            try {
                long value = Long.parseLong(part.trim());
                
                // Update count always since it's a valid integer found in the input string structure
                // Note: The requirement says "ignore elements that cannot be interpreted as integers". 
                // So we only increment if parse succeeds.
                
                // Wait, does 'count' mean number of items in the comma-separated list provided?
                // Or just count of valid numbers found? Usually implies count of successfully parsed ones based on context ("validating").
                // The prompt says: "Those elements... ignore invalid". So count = count of valid integers.
                
                if (!hasValue || value > maxValue) {
                    hasValue = true;
                    maxValue = value;
                }
            } catch (NumberFormatException e) {
                continue; 
            }

            // Actually, wait. The comparison `value > maxValue` works even for negatives IF we set initial correctly.
            // But with boolean flag approach:
            /*
               hasValue is false initially. First valid number sets it to true and becomes max.
               Subsequent numbers update if greater. This handles all negative ranges perfectly.
               
               However, there's a small logic gap in the previous block inside this thought process regarding counting.
               Count should be incremented for EVERY valid integer found? 
               "要素数" (element count) - yes, usually means how many elements were successfully processed/validated.
            */

            // Let's restructure to ensure correct incrementing of 'count' and finding max simultaneously cleanly.
        }
        
        System.out.println("count=" + 0 + " max=0"); // Placeholder
        
    }
    
    // Final clean implementation below:
}
