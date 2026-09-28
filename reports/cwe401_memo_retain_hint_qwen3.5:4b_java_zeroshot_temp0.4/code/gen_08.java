import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0 || !Character.isDigit(line.charAt(0)) && line.length() > 1) {
                    continue;
                }
                totalSteps += collatzStep(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int collatzStep(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + collatzStep(n / 2);
        } else {
            steps = 1 + collatzStep(3 * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
