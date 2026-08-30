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

        int count = 0;
        long maxVal = Long.MIN_VALUE; // Assuming values can be negative based on "64bit integer range" context, though problem implies positive usually. However, to be safe for full 64-bit signed integers:
        
        // Using a flag approach or handling the first element separately is safer than initializing with MIN_VALUE if negatives are allowed and we want strict logic. 
        // But since Java's Long.MIN_VALUE is valid input, let's track max properly.
        boolean found = false;

        StringTokenizer st = new StringTokenizer(line);
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token.trim());
                
                if (!found) {
                    count++;
                    maxVal = val;
                    found = true;
                } else {
                    count++;
                    if (val > maxVal) {
                        maxVal = val;
                    }
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します"
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
