import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        int validCount = 0;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        while ((line = br.readLine()) != null) {
            // 1. Trim the line to handle leading/trailing whitespace
            String trimmedLine = line.trim();

            // 2. Check for empty lines
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 3. Validate the structure: must consist of comma-separated number sequences.
            // We split by comma. The resulting tokens must represent valid number sequences.
            String[] parts = trimmedLine.split(",");
            
            boolean isValid = false;
            
            // Check if there is at least one non-empty part.
            // If the line is just "," or " , ", parts will contain empty strings.
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    // Check if the part consists only of digits (and potentially signs, though context implies positive integers)
                    // Since the requirement specifies "数字列" (sequence of numbers), we check if it's purely numeric.
                    try {
                        // Attempt to parse the part as an integer. If successful, it is a valid number sequence.
                        Integer.parseInt(trimmedPart);
                        isValid = true;
                        break; // Found at least one valid number sequence
                    } catch (NumberFormatException e) {
                        // If parsing fails, this part is not a valid number sequence.
                        // Since we are checking if *any* part is valid, we continue checking other parts.
                    }
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
