import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        BigInteger countBig, maxVal;
        boolean first = true;
        int count = 0; // Using int for counting as per typical CP constraints unless specified otherwise. 
                      // The prompt says values fit in 64-bit integers, but not necessarily the count itself (though it likely fits too).
        
        String[] parts = line.split(",");

        maxVal = BigInteger.ZERO;
        for (String p : parts) {
            if (!p.trim().isEmpty()) {
                try {
                    BigInteger val = new BigInteger(p.trim());
                    // First element or greater than current max? Since we need to handle negative numbers correctly, 
                    // and the prompt implies standard integer comparison.
                    // Note: If all inputs are non-positive or it's just the first one regardless of value relative to 0 (if initialized at -infinity)
                    // But BigInteger.ZERO is not -Infinity. However, since we need max, let's use a flag approach for the very first valid number 
                    // and compare against maxVal after initialization. Wait, if inputs are negative? 
                    
                    // Let's refine logic: Initialize with null or handle first element separately to ensure correct maximum selection even for negatives.
                } catch (NumberFormatException ignored) { /* skip invalid */ }
            } else continue;
        }

        // Re-read and process correctly since the loop above didn't store values properly due to try-catch placement in thought draft. 
        // Correct implementation below:
        
        maxVal = null; 
        count = 0;
        
        for (String p : parts) {
            String trimmed = p.trim();
            if (!trimmed.isEmpty()) {
                BigInteger val = new BigInteger(trimmed);
                
                if (maxVal == null || !val.compareTo(maxVal).equals(1)) { // If first or equal? No, strictly greater for update usually, but max is idempotent. 
                     // Actually standard logic: if (first) set; else if (val > max) set;
                     count++; 
                } else if (!maxVal.equals(val)) {
                   // Just to be safe with duplicates not changing anything? No, we just need the value.
                }

                if (maxVal == null || val.compareTo(maxVal).compareTo(1) >= 0) { 
                    maxVal = val;
                }
                
                count++;
            } else continue; // Skip empty parts after split logic might have created them, though prompt says "ignore". Split usually produces non-empty unless string is just commas.
        }

        // Wait, the loop above was messy. Let's write clean code now.
        
    }
}
