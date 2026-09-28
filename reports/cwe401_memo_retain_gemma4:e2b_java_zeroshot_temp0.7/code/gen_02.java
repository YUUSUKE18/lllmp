import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    long count = 0;
                    totalCount += count;
                    // Memoize the result for 1
                    memo.put(1L, 0L);
                } else if (!memo.containsKey(n)) {
                    // Recursive calculation with memoization
                    long steps;
                    if (n % 2 == 0) {
                        steps = memo.get(n / 2) + 1;
                    } else {
                        steps = memo.get(3 * n + 1) + 1;
                    }
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    // Already memoized
                    totalCount += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
