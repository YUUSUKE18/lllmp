import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validLines = 0;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (!line.isEmpty() && line.matches(".*,.*")) {
                validLines++;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
