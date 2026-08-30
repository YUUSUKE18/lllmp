import java.util.Scanner;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        
        int count = 0;
        long maxVal = Long.MIN_VALUE; // Assuming values are within range, use MIN_VALUE
        
        if (sc.hasNext()) {
            String line = sc.nextLine();
            
            // Remove leading and trailing whitespace
            line = line.trim();
            
            if (!line.isEmpty()) {
                // Split by comma or potential multiple spaces/newlines after split
                String[] parts = line.split("[,\\s]+"); 
                
                for (String part : parts) {
                    try {
                        long val = Long.parseLong(part);
                        
                        // Check bounds to ensure it's within 64-bit range (though parseLong handles this mostly, we check against min/max explicitly if needed, but here just trust valid integer input per spec)
                        if (val < maxVal || maxVal == Long.MIN_VALUE) {
                            count++;
                            maxVal = val;
                        } else {
                             // Ensure we update even on ties or first occurrence logic is covered by initial check
                             // Actually, simpler: just parse and track
                        }
                    } catch (NumberFormatException e) {
                        // Ignore non-integer elements as per spec
                    }
                }
            }
        } else if (!sc.hasNextLine() || sc.nextLine().trim().isEmpty()) {
             count = 0;
             maxVal = Long.MIN_VALUE; 
        }

        // Re-evaluate logic for correctness: init with first valid or MIN_VALUE.
        // If list is empty, what should happen? The spec implies elements are given but says "ignore uninterpretable".
        // If count is 0 (no valid integers), maxVal remains MIN_VALUE. 
        // Let's refine the counting logic to be robust.
        
        // Reset and proper loop
        int finalCount = 0;
        long currentMax = Long.MIN_VALUE; 
        
        if (!line.isEmpty()) {
            String[] tokens = line.split("[,\\s]+");
            
            for (String token : tokens) {
                try {
                    val = Long.parseLong(token.trim()); // trim again just in case split left spaces
                    
                    finalCount++;
                    
                    // Since we need to know the maximum at the end or track it incrementally.
                    // To avoid issues with initial value, let's collect all and find max? 
                    // No, single pass is fine if initialized correctly or handled via conditional first element.
                    // But standard practice: initialize minVal = Long.MAX_VALUE. If count > 0 update to val else keep MIN_VALUE logic adjusted.
                    
                } catch (NumberFormatException e) {
                    continue;
                } finally {} 
            }
        }

        System.out.println("count=" + finalCount + " max=" + currentMax); // Wait, I need correct variable scope
        
    }
}
