import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        long totalSteps = 0;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                totalSteps += calculateCollatz(n);
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
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

        long next;
        if (n % 2 == 0) {
            next = n / 2;
        } else {
            next = 3 * n + 1;
        }

        long steps = calculateCollatz(next) + 1;
        memo.put(n, steps);
        return steps;
    }
}
