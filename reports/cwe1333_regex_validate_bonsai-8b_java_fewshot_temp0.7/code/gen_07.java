import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (!line.isEmpty()) {
                String[] parts = line.split(",");
                if (parts.length >= 1) {
                    boolean valid = true;
                    for (String p : parts) {
                        if (p.trim().isEmpty() || !p.trim().matches("\\d+")) {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) validLines++;
                }
            }
        }
        System.out.println("valid=" + validLines);
    }
}
