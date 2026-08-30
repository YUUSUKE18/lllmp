import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                long steps = collatzStep(n);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static long collatzStep(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        long steps;
        if (n % 2 == 0) {
            steps = 1 + collatzStep(n / 2);
        } else {
            steps = 1 + collatzStep(3 * n + 1);
        }

        memo.put(n, steps);
        return steps;
    }
}
