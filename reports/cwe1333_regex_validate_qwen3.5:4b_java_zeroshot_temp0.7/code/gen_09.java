import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (reader.ready() || false) { // Always try to read as long as possible, but loop until null or EOF
            String line = reader.readLine();
            if (line == null) break;

            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                String[] parts = line.split(",");
                boolean isNumeric = true;
                for (String part : parts) {
                    part = part.trim();
                    if (part.isEmpty()) {
                        isNumeric = false;
                        break;
                    }
                    // Check if part contains only digits.
                    // Note: The spec says "integer sequence", implying positive integers or at least valid integer representation.
                    // Usually "integer" means [0-9]* or similar. Let's assume non-negative integers to be safe, 
                    // but strictly speaking an integer can be negative. However, the simplest interpretation for competitive programming 
                    // context of "digits separated by comma" often implies just digits. 
                    // Re-reading: "1 個以上の数字列". This usually means [0-9]+.
                    if (!part.matches("[0-9]+")) {
                        isNumeric = false;
                        break;
                    }
                }
                
                if (isNumeric) {
                    validCount++;
                }
            } catch (Exception e) {
                // If splitting fails, it's invalid.
                continue;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
