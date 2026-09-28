import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        List<String> lines = new ArrayList<>();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        // Read all input lines
        while ((line = br.readLine()) != null) {
            lines.add(line);
        }

        int validCount = 0;

        for (String inputLine : lines) {
            // 1. Trim the line to handle leading/trailing whitespace
            String trimmedLine = inputLine.trim();

            // 2. Check for empty lines
            if (trimmedLine.isEmpty()) {
                continue; // Invalid
            }

            // 3. Check for content validity (must contain at least one number sequence separated by commas)
            
            // Split the line by comma
            // Note: We use the original trimmed line for splitting to handle internal whitespace correctly
            String[] parts = trimmedLine.split(",");
            
            boolean isValid = false;
            
            // Check if there is at least one non-empty part resulting from the split.
            // This handles cases like "1,2" (parts=["1", "2"]) or "1," (parts=["1", ""])
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // If we find at least one non-empty token, the line represents a list of numbers.
                    isValid = true;
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
