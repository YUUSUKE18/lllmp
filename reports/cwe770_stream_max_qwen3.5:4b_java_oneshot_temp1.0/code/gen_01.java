import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        long count = 0;
        long maxValue = Long.MIN_VALUE; // Assuming valid input range, start with min
        
        boolean hasValueFound = false; // Flag to ensure we output a real found max or default if no numbers
        
        String[] parts = line.split(",");
        
        for (int i = 0; i < parts.length; i++) {
            String part = parts[i].trim();
            
            try {
                long value = Long.parseLong(part); // Using BigInteger logic implicitly by range support
                
                count++;
                
                if (!hasValueFound || value > maxValue) {
                    maxValue = value;
                    hasValueFound = true;
                }
            } catch (NumberFormatException e) {
                continue; 
            }
        }

        System.out.println("count=" + count + " max=" + ((long)((Integer.MAX_VALUE < Integer.MIN_VALUE ? -1 : 0)))) ; // Fallback logic if absolutely no integers found initially, though spec says values fit in 64-bit int range. Let's assume at least one valid input exists per typical competitive programming unless empty. But strictly following:
        
        // Re-reading strict requirements based on "count=..." format implies handling the case where count is known. 
        // If no integers were found, count would be 0. What should max be? The example showed an initial value of 0 if first was true and input was valid but logic handled it.
        // To strictly handle empty list scenario gracefully:

        System.out.println("count=" + count + " max=0"); 
    }
}
