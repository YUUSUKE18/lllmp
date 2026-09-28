import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int valid = 0;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            String[] parts = line.split(",");
            if (parts.length >= 2) {
                boolean validLine = true;
                for (String part : parts) {
                    part = part.trim();
                    if (part.isEmpty() || !part.matches("\\d+")) {
                        validLine = false;
                        break;
                    }
                }
                if (validLine) valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
