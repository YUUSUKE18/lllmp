import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        boolean first = true;
        if (line != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                if (part.matches("\\d+")) {
                    validCount++;
                    first = false;
                }
            }
        }
        System.out.println("valid=" + validCount);
    }
}
