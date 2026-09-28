import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (!line.isEmpty() && line.contains(",")) {
                String[] parts = line.split(",");
                for (String part : parts) {
                    if (!part.trim().isEmpty() && part.trim().matches("\\d+")) {
                        validLines++;
                        break;
                    }
                }
            }
        }
        System.out.println("valid=" + validLines);
    }
}
