import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        int count = 0;
        for (int i = 1; i < 2; i++) {
            String line2 = br.readLine();
            if (line2 == null || line2.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line2.trim());
                if (n == target) count++;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
