import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        boolean first = true;
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            int n = 0;
            boolean found = false;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    n = Integer.parseInt(f);
                    found = true;
                    break;
                } catch (NumberFormatException e) {
                }
            }
            if (!found) continue;
            int count = 0;
            while (n != 1) {
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                count++;
            }
            total += count;
            first = false;
        }
        System.out.println("total=" + total);
    }
}
