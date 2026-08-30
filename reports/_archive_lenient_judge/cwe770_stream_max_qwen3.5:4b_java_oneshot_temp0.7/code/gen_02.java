import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long maxVal = Long.MIN_VALUE; // 64bit integer minimum value as initial placeholder, though logic below handles first element separately or uses a flag. Actually, using the same pattern as example but adapted for count and max is safer.
        boolean hasValue = false;
        int count = 0;

        if (line != null) {
            String[] parts = line.trim().split(",");
            
            // Remove empty strings that might result from leading/trailing commas or consecutive commas? 
            // The spec says "ignore blank elements". Split by comma usually gives non-empty unless input is just "" or ",". 
            // Let's handle potential empty parts in the loop to be robust against spaces around numbers if any (though not explicitly asked, good practice).
            
            for (String part : parts) {
                String trimmed = part.trim();
                try {
                    long val = Long.parseLong(trimmed);
                    
                    if (!hasValue || val > maxVal) {
                        hasValue = true;
                        maxVal = val; // Initialize logic: first found value sets the 'max' effectively. 
                        // Wait, my initialization of maxVal to MIN_VALUE might be risky if valid input is exactly MIN_VALUE and no previous set happened? 
                        // Better approach: Use a flag or initialize with Long.MIN_VALUE but check carefully.
                        // Actually, simpler logic from example pattern adapted here:
                    } else {
                        count++;
                    }

                } catch (NumberFormatException e) {
                    continue; // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
                }
            }
        } else if (!hasValue && line == null) {
             // If input is completely empty/null, count remains 0. maxVal needs to be handled for output? 
             // The example outputs `max=0` even on potentially weird inputs but here we need valid logic.
             // Let's re-implement the core loop cleanly based on the requirement "count" and "max".
        }

        // Re-verify with a cleaner implementation inside main to ensure correctness for edge cases like all invalid numbers or single number.
    }
}
