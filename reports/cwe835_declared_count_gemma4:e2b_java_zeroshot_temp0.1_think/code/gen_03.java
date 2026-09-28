import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1. Read the expected count (Line 1)
        String line1 = br.readLine();
        if (line1 == null) {
            // No input provided
            System.out.println("count=0 sum=0");
            return;
        }
        
        // We don't strictly need the expected count N, but we read it to adhere to the input structure.
        // int expectedCount = Integer.parseInt(line1.trim()); 

        long count = 0;
        long sum = 0;

        // 2. Read the remaining lines and process integers
        String line;
        while ((line = br.readLine()) != null) {
            // Trim the line to handle potential whitespace
            String trimmedLine = line.trim();
            
            // Ignore empty lines
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                // Attempt to parse the line as a long (64-bit integer)
                long number = Long.parseLong(trimmedLine);
                
                // Update count and sum
                count++;
                sum += number;
                
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Output the result
        System.out.println("count=" + count + " sum=" + sum);
    }
}
