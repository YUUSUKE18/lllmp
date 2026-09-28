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
            if (line.endsWith(",")) line = line.substring(0, line.length() - 1);
            String[] parts = line.split(",");
            if (parts.length >= 1) {
                boolean validRow = true;
                for (String p : parts) {
                    if (p.trim().isEmpty() || !p.trim().matches("\\d+")) {
                        validRow = false;
                        break;
                    }
                }
                if (validRow) valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
