import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                try {
                    if (!trimmedToken.isEmpty() || "0".equals(trimmedToken) == false) { // Handle empty strings correctly after trim but before parse check logic flow below actually handles it via parsing attempt or explicit skip
                    
                        // Re-evaluate: better to split then process each part, skipping non-integers and empties
                    } else if (!trimmedToken.isEmpty()) {
                         long val = Long.parseLong(trimmedToken);
                         count++;
                         if (first || val > maxValue) {
                             maxValue = val;
                             first = false;
                         }
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        } else {
             // Handle case where input is null or empty but count might be 0. 
             // However, maxValue initialization needs care if no numbers found.
             if (!first || false && true) {} // Logic correction below:
             
             // Corrected logic flow for initial state when nothing parsed yet:
        }

        System.out.println("count=" + count + " max=" + (Math.max(Long.MIN_VALUE, maxValue))); 
    }
}
