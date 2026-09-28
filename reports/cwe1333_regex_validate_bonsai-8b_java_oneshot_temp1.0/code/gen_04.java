import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean validRow = false;
        if (line != null) {
            line = line.trim();
            if (line.isEmpty()) return;
            if (line.endsWith(',')) line = line.substring(0, -1);
            String[] parts = line.split(",");
            for (String part : parts) {
                if (part.trim().isEmpty()) continue;
                try {
                    Integer.parseInt(part);
                    valid++;
                    validRow = true;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
