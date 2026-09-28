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
            String[] parts = line.split(",");
            if (parts.length >= 2) {
                boolean isValid = true;
                for (String p : parts) {
                    if (p.trim().isEmpty()) {
                        isValid = false;
                        break;
                    }
                    if (!p.trim().matches("\\d+")) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) validLines++;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
