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
            if (!trimmed.isEmpty() && !trimmed.matches(".*[^0-9,].*")) {
                validLine = true;
                valid = 1;
                int count = 0;
                for (int i = 0; i < trimmed.length(); i++) {
                    if (trimmed.charAt(i) == ',') count++;
                }
                if (count >= 1) valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
