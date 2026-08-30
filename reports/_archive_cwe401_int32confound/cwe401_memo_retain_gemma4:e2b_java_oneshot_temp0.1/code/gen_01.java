import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    long steps = 0;
                    totalCount += steps;
                    // Memoize the result for n=1
                    memo.put(n, steps);
                } else if (!memo.containsKey(n)) {
                    // Recursive calculation with memoization
                    long steps;
                    if (n % 2 == 0) {
                        steps = 1 + memo.get(n / 2);
                    } else {
                        steps = 1 + (3 * n + 1);
                    }
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    // Use memoized result
                    long steps = memo.get(n);
                    totalCount += steps;
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
