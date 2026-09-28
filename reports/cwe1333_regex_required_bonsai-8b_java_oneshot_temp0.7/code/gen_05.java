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
            if (line.isEmpty()) return;
            if (line.contains(",")) {
                validLine = true;
                String[] parts = line.split(",");
                for (String part : parts) {
                    part = part.trim();
                    if (part.isEmpty()) continue;
                    if (part.matches("\\d+")) {
                        valid++;
                    }
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
