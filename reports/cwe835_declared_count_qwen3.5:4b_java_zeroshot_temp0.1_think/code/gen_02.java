import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Read Line 1 (Expected count) - Consume it but do not use for logic control
        String line = br.readLine();
        if (line == null) return;
        
        long sum = 0;
        int actualCount = 0;

        // Read subsequent lines until EOF
        while ((line = br.readLine()) != null) {
            line = line.trim();
            // Ignore empty lines
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                // Try to parse as a single integer. 
                // If the line contains multiple integers or non-integer text, this will throw NumberFormatException,
                // which aligns with "lines that cannot be interpreted as integers".
                long val = Long.parseLong(line);
                sum += val;
                actualCount++;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
