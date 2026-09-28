import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (line.contains(",")) {
                String[] parts = line.split(",");
                boolean hasNumbers = false;
                for (String part : parts) {
                    if (part.trim().matches("\\d+")) {
                        hasNumbers = true;
                        break;
                    }
                }
                if (hasNumbers) validLines++;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
