import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    long steps = 0;
                    totalCount += steps;
                    // Memoization for 1
                    memo.put(1, steps);
                } else if (!memo.containsKey(n)) {
                    // Recursive calculation with memoization
                    long steps;
                    if (n % 2 == 0) {
                        // n is even: n/2
                        steps = 1 + memo.get(n / 2);
                    } else {
                        // n is odd: 3n+1
                        steps = 1 + memo.get(3 * n + 1);
                    }
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    // Already computed
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
