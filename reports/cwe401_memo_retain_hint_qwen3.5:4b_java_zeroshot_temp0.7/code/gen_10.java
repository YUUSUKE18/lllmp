import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    private static long[] memo;

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line.trim());
                totalSteps += solve(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long solve(int n) {
        if (n == 1) {
            return 0;
        }
        long steps = memo[n];
        if (steps != -1) {
            return steps;
        }

        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            // 3n+1 が 64bit に収まることが保証されているため、long で計算する
            nextN = 3L * n + 1;
        }

        long stepsRecursive = solve(nextN);
        memo[n] = stepsRecursive + 1;
        return memo[n];
    }
}
