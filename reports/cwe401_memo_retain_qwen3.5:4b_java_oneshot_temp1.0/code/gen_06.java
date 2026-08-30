import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                long stepCount = calculateCollatz(n, memo);
                total += stepCount;
            } catch (NumberFormatException e) {
            }
        }

        System.out.println("total=" + total);
    }

    private static long calculateCollatz(long n, Map<Long, Long> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        long steps;
        if (n % 2 == 0) {
            steps = 1 + calculateCollatz(n / 2, memo);
        } else {
            steps = 1 + calculateCollatz(3L * n + 1, memo);
        }
        memo.put(n, steps);
        return steps;
    }
}
