import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean validLine = false;
        if (line != null) {
            line = line.trim();
            if (line.isEmpty()) {
                valid = 0;
            } else {
                String[] parts = line.split(",");
                validLine = true;
                for (String part : parts) {
                    if (part.trim().isEmpty()) {
                        validLine = false;
                        break;
                    }
                    if (!part.trim().matches("\\d+")) {
                        validLine = false;
                        break;
                    }
                }
                if (validLine) {
                    valid = parts.length;
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
