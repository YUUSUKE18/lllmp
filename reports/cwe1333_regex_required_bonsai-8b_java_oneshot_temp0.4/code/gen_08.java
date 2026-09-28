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
                String[] parts = trimmedLine.split(",");
                for (String part : parts) {
                    if (!part.isEmpty() && part.matches("\\d+")) {
                        validCount++;
                    }
                }
            }
        }
        System.out.println("valid=" + validCount);
    }
}
