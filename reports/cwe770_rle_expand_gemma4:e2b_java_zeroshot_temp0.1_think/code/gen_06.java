import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // 1. Parse the input string
        // The input is a comma-separated list of "value:count" pairs.
        String[] pairs = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String pair : pairs) {
            // Trim whitespace just in case
            String trimmedPair = pair.trim();
            if (trimmedPair.isEmpty()) {
                continue;
            }

            // Split the pair by the colon
            String[] parts = trimmedPair.split(":");

            if (parts.length == 2) {
                try {
                    // Parse value and count
                    long value = Long.parseLong(parts[0].trim());
                    long count = Long.parseLong(parts[1].trim());

                    // Calculate total elements (count)
                    totalCount += count;

                    // Calculate total sum (value * count)
                    totalSum += value * count;

                } catch (NumberFormatException e) {
                    // Ignore elements that cannot be parsed as numbers
                    // This handles cases where the format is invalid, fulfilling the requirement to ignore uninterpretable elements.
                }
            }
        }

        // 2. Output the result
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
