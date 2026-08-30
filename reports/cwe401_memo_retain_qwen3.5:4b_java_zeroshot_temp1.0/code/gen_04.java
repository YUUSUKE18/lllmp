import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.Set;

public class Main {
    private static final Map<Integer, Long> memo = new java.util.HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int queryCount = 0;
        long totalSteps = 0;
        boolean first = true;

        while (true) {
            String line = reader.readLine();
            if (line == null) break;
            if (line.trim().isEmpty()) continue;

            try {
                int n = Integer.parseInt(line.trim());
                long steps = solve(n);
                totalSteps += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long solve(int n) {
        if (n == 1) {
            return 0;
        }
        int key = n;
        return memo.computeIfAbsent(key, k -> calculate(k));
    }

    private static long calculate(long n) {
        if (n == 1) {
            return 0;
        }
        long steps;
        if ((n & 1) == 0) {
            steps = 1 + calculate(n / 2);
        } else {
            steps = 1 + calculate(3 * n + 1);
        }
        return steps;
    }
}
