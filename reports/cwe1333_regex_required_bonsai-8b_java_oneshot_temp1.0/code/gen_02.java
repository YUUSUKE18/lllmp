import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        if (line != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                // Check if the line is a valid comma-separated integer list
                if (trimmedLine.matches("([0-9]+)(?:,[0-9]+)*")) {
                    validCount++;
                }
            }
        }
        System.out.println("valid=" + validCount);
    }
}
