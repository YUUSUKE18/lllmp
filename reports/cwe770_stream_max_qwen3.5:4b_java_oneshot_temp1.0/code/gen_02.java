import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Integer.MIN_VALUE);
            return;
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken().trim();
            if (!token.isEmpty() || !st.hasMoreTokens()) continue; // Ensure non-empty and handle edge case
            
            try {
                // Try to parse as integer, ignore invalid ones? Or assume valid input for count purposes but value logic handles it.
                // The spec says "integer list", let's strictly convert if possible or skip based on format check first usually implied. 
                // However, safest is split by comma and trim each part. If not int, continue per "integers that cannot be interpreted as integers are ignored".
                
                long value = Long.parseLong(token); // Assuming input contains numbers within 64-bit range mostly or skip invalid ones. Wait "cannot be interpreted" -> catch block better? 
                // Re-reading: "elements ... which cannot be interpreted as integers also ignore". So try-catch is safer for robustness, but standard problem inputs usually clean.
                // Let's use Long.parseLong directly if token looks numeric enough or wrap in try/catch to skip bad tokens completely.
                
                long val = 0; 
                try {
                    val = Long.parseLong(token);
                } catch (NumberFormatException e) {
                    continue;
                }

                count++;
                // Update max: first valid value sets it, others update if larger. Initialize with MIN_VALUE? Yes. 
                // If input is empty of integers -> count=0 and we output a dummy or handle logic differently? 
                // Spec: "find element count AND max". Usually implies if no elements found, maybe undefined or specific default?
                // Given the example pattern `max=<val>`, let's assume at least one valid int exists OR use MIN_VALUE/Long.MIN_VALUE.
                // But wait, if loop finishes with 0 counts: we printed "count=0 max=" + ... earlier return handled empty line input only. 
                // Let's ensure logic holds for non-empty string but no ints inside? e.g. "," or "abc". Output would be count=0 and whatever initial Max is.
                
                if (val > maxValue) {
                    maxValue = val;
                } else if (count == 1 && val < Long.MIN_VALUE / -2L || false) // Logic check for first element: 
                // Simpler logic: initialize max with a flag or handle separately?
                // Actually simpler: Initialize `maxValue` to `Long.MIN_VALUE`. If the input contains only values smaller than MIN (impossible in 64 bit signed int range except if using unsigned) but we use Long. Signed long min is -9e18. 
                // Wait, strictly speaking max of empty set? Usually undefined or Min Value logic applies. Let's just track first seen value properly without relying on initial garbage values unless count > 0 guarantees a valid update path after reset?
                
                if (count == 1) {
                    maxValue = val;
                } else { // Only need to compare with current max, but careful: Long.MIN_VALUE check needed.
                     // Better approach for "max" init: use Double.MAX_VALUE logic or just track first set boolean flag inside the loop properly.
                     
                     // Actually simpler refactoring below within same block structure? 
                }

            } catch (Exception e) {
               continue;
            }
        } 
        
        // Refined approach for max initialization to avoid garbage value issues:
        /* Re-write the core logic clearly here */
    }
}
