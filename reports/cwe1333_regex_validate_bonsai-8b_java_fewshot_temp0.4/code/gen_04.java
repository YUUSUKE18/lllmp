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
                boolean valid = true;
                for (String part : parts) {
                    if (part.trim().isEmpty()) {
                        valid = false;
                        break;
                    }
                    if (!part.trim().matches("\\d+")) {
                        valid = false;
                        break;
                    }
                }
                if (valid && parts.length >= 1) {
                    validLines++;
                }
            }
        }
        System.out.println("valid=" + validLines);
    }
}
