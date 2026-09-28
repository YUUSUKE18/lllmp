import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1. Read the expected count N (first line)
        String lineN = br.readLine();
        if (lineN == null) {
            // No input provided
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount;
        try {
            expectedCount = Integer.parseInt(lineN.trim());
        } catch (NumberFormatException e) {
            // If the first line is not a valid integer, treat actual count as 0
            System.out.println("count=0 sum=0");
            return;
        }

        long actualCount = 0;
        long totalSum = 0;

        // 2. Read the remaining lines and process integers
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }

            try {
                // Attempt to parse the line as a long (64-bit integer)
                long number = Long.parseLong(trimmedLine);
                
                // Update count and sum
                actualCount++;
                totalSum += number;
                
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Output the result
        System.out.println("count=" + actualCount + " sum=" + totalSum);
    }
}
