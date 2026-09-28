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

        // The expected count N is read, but we only care about the actual numbers found.
        // We initialize actualCount and totalSum based on the actual reading process.
        long actualCount = 0;
        long totalSum = 0;

        // 2. Read the remaining lines (the actual numbers)
        String line;
        while ((line = br.readLine()) != null) {
            // Ignore empty lines
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // Attempt to parse the line as a long
                long number = Long.parseLong(line.trim());
                
                // Update count and sum
                actualCount++;
                totalSum += number;
                
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Output the result in the required format
        System.out.println("count=" + actualCount + " sum=" + totalSum);
    }
}
