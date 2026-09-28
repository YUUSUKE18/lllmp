import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        if (line != null) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) valid = 0;
            else {
                String[] parts = trimmed.split(",");
                for (String part : parts) {
                    if (part.trim().matches("\\d+")) valid++;
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
