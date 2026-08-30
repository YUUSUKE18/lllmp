import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    total += 0;
                    continue;
                }

                long current = n;
                long steps = 0;
                // Memoization check
                if (memo.containsKey(current)) {
                    steps = memo.get(current);
                } else {
                    // Calculate steps
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            steps = memo.get(current);
                            break;
                        }
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    // Store in memoization table (for the current starting N)
                    // Since we are calculating steps from N, we memoize the result for N.
                    // However, the problem implies a sequence transformation from N to 1.
                    // The standard context for this problem (Collatz Conjecture) is that we find the sequence length.
                    // We memoize the result for the starting number 'n'.
                    memo.put(n, steps);
                }
                total += steps;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + total);
    }
}
