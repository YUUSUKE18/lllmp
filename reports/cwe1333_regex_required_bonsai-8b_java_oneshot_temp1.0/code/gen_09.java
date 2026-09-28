import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validLines = 0;
        boolean valid = false;
        if (line != null) {
            String trimmed = line.trim();
            if (!trimmed.isEmpty() && trimmed.matches("^[\\d separated by commas]+$")) {
                validLines++;
                valid = true;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
