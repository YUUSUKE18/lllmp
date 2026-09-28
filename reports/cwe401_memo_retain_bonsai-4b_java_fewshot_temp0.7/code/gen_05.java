import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = new int[1000000]; // 32-bit 整数範囲を越えられる値は1000000で安全にキャッシュ
        int current = 0;

        while ((int ch = br.read()) != -1) {
            String line = ch.toString();
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) continue;
                if (memo[n] != 0) continue;
                int steps = 0;
                int val = n;
                while (val != 1) {
                    if (val % 2 == 0) {
                        val = val / 2;
                    } else {
                        val = 3 * val + 1;
                    }
                    if (memo[val] != 0) break;
                    memo[val] = steps + 1;
                    steps++;
                    val = val > 0 ? val : 1;
                }
                memo[n] = steps;
                total += memo[n];
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
