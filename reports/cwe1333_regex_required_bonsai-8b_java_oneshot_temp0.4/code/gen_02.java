import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        boolean validLine = false;
        if (line != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) return;
            if (trimmedLine.matches("^[\\d,]+$")) {
                validCount++;
                validLine = true;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
