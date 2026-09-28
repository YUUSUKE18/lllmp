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
                if (parts.length >= 2) {
                    validLines++;
                }
            }
        }
        System.out.println("valid=" + validLines);
    }
}
