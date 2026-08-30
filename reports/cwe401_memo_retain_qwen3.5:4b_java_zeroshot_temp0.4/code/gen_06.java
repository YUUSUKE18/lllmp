import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) {
                    continue;
                }
                totalSteps += calculateCollatz(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long calculateCollatz(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            steps = calculateCollatz(n / 2) + 1;
        } else {
            steps = calculateCollatz(3 * n + 1) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
