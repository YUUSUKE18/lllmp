import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0, count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part.trim());
                    if (n == target) count++;
                    if (count == 2) break;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
