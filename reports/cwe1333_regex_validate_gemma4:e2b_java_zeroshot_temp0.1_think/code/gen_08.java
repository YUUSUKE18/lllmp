import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 1. Trim leading/trailing whitespace
            String trimmedLine = line.trim();

            // 2. Check for emptiness
            if (trimmedLine.isEmpty()) {
                continue; // Empty lines are invalid
            }

            // 3. Validate the structure: must consist of comma-separated number sequences.
            // We split by comma. The resulting tokens must all be non-empty sequences of digits.
            String[] parts = trimmedLine.split(",");
            boolean isValid = true;

            for (String part : parts) {
                // Check if the part is empty (e.g., caused by "1,,2")
                if (part.isEmpty()) {
                    isValid = false;
                    break;
                }
                // Check if the part consists only of digits
                if (!part.matches("\\d+")) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        // Output the result
        System.out.println("valid=" + validCount);
    }
}
