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
            String[] parts = line.split(",");
            if (parts.length >= 2) {
                boolean allDigits = true;
                for (String part : parts) {
                    part = part.trim();
                    if (part.isEmpty()) continue;
                    for (char c : part.toCharArray()) {
                        if (!Character.isDigit(c)) {
                            allDigits = false;
                            break;
                        }
                    }
                    if (!allDigits) break;
                }
                if (allDigits) valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
