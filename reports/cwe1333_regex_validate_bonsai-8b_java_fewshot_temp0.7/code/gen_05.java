import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int valid = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            if (line.contains(",")) {
                String[] parts = line.split(",");
                boolean validLine = true;
                for (String part : parts) {
                    if (part.trim().isEmpty()) {
                        validLine = false;
                        break;
                    }
                    if (!part.trim().matches("^-\\d+$")) {
                        validLine = false;
                        break;
                    }
                }
                if (validLine && parts.length >= 1) valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
