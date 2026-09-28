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
        int totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line);
                totalSteps += computeCollatz(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int computeCollatz(long n) {
        if (n == 1) {
            return 0;
        }

        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + computeCollatz(n / 2);
        } else {
            steps = 1 + computeCollatz(3 * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
