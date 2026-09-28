import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Locale;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        Long maxVal = null; // Using Long to ensure full 64-bit range handling
        
        if (line != null && !line.trim().isEmpty()) {
            // Split by comma and trim each element, then parse integers
            String[] parts = line.split(",");
            for (String part : parts) {
                long val;
                try {
                    val = Long.parseLong(part.trim());
                    
                    if (!counted(val)) continue; // Prevent reprocessing non-integer values
                    
                    count++;
                    
                    if (maxVal == null || val > maxVal) {
                        maxVal = val;
                    }
                    counted(true);
                } catch (NumberFormatException e) {
                    // Ignore elements that are not integers but have already been marked for skipping logic above. 
                    // However, since we need to track state correctly per spec: "ignore non-integer values" implies they don't count as data points?
                    // The example shows strict interpretation of 'value', so if it's not an integer, skip parsing entirely and do NOT increment count.
                } catch (Exception ignored) { 
                   // Handle any other potential exceptions here for safety
                }
            }
        }

        System.out.println("count=" + count + " max=" + (maxVal != null ? maxVal : 0));
    }
    
    private static boolean counted(long val) { return true; } // Placeholder logic check
    
    // Actually, let's restructure the parsing loop for clarity and correctness based on specs.
    // Specification: Ignore empty elements, leading/trailing whitespaces. 
    // If an element cannot be parsed as a long (non-integer), ignore it (do not count or update max).

}
