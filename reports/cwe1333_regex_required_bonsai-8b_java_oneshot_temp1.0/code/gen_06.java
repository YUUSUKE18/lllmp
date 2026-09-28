import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean validLine = false;
        if (line != null) {
            String trimmed = line.trim();
            if (!trimmed.isEmpty()) {
                String[] parts = trimmed.split(",");
                for (String part : parts) {
                    if (!part.isEmpty() && part.matches("\\d+")) {
                        valid++;
                        validLine = true;
                    }
                }
                if (validLine) {
                    System.out.println("valid=" + valid);
                }
            }
        }
    }
}
