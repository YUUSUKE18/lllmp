import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

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

            // 3. Check content: Must only contain digits and commas
            boolean isValidContent = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValidContent = false;
                    break;
                }
            }

            if (isValidContent) {
                // If the line contains only digits and commas (and is not empty), it is valid.
                validCount++;
            }
        }

        // Output the result
        System.out.println("valid=" + validCount);
    }
}
