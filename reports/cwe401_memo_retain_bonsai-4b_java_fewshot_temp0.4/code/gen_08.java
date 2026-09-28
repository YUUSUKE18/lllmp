import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = 0;
        int current = 1;
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            String[] parts = line.trim().split("\\s+");
            int n = 0;
            for (String part : parts) {
                if (part.trim().isEmpty()) continue;
                try {
                    n = Integer.parseInt(part);
                    break;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
            if (n == 1) {
                total += 0;
            } else if (n % 2 == 0) {
                int steps = 0;
                int val = n;
                while (val != 1) {
                    val = val / 2;
                    steps++;
                }
            } else {
                int steps = 0;
                int val = 3 * n + 1;
                while (val != 1) {
                    val = val / 3;
                    steps++;
                }
            }
            total += steps;
            memo = memo + steps;
        }
        System.out.println("total=" + total);
    }
}
