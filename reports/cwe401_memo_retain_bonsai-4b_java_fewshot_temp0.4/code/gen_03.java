import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = 0;
        int current = 0;
        while ((current = br.readLine()) != null) {
            String line = current.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    memo = 0;
                    break;
                }
                int steps = 0;
                int val = n;
                while (val != 1) {
                    if (val % 2 == 0) {
                        val = val / 2;
                    } else {
                        val = 3 * val + 1;
                    }
                    if (val > 2147483647 || val < -2147483648) {
                        break;
                    }
                    steps++;
                }
                if (memo == 0) memo = steps;
                total += steps;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
