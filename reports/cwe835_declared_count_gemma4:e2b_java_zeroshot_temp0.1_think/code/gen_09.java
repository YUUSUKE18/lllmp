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

        // The expected count is read, but we will rely on actual parsed numbers for the count.
        // We must handle the case where the input stream ends immediately after the count.

        long actualCount = 0;
        long sum = 0;

        // 2. Read the remaining lines and parse integers
        String line;
        while ((line = br.readLine()) != null) {
            // Ignore empty lines
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // Attempt to parse the line as a long (64-bit integer)
                long number = Long.parseLong(line.trim());
                
                // Update count and sum
                actualCount++;
                sum += number;
                
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                // This handles the requirement to ignore lines that cannot be interpreted as integers.
            }
        }

        // 3. Output the result
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
