import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        boolean valid = false;
        if (line != null) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) valid = false;
            else {
                String[] parts = trimmed.split(",");
                if (parts.length >= 1) {
                    for (String part : parts) {
                        if (part.isEmpty()) valid = false;
                        else {
                            if (part.trim().matches("-?\\d+")) {
                                valid = true;
                            }
                        }
                    }
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
