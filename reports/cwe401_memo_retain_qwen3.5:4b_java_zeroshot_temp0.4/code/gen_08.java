import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line);
                totalSteps += calculateCollatz(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateCollatz(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateCollatz(n / 2);
        } else {
            steps = 1 + calculateCollatz(3 * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
