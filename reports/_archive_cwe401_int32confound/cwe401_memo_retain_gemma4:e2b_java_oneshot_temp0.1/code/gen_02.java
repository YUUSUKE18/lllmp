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
                    long count = 0;
                    totalCount += count;
                    // Memoization is implicitly handled by the map, though 1 is the base case.
                    // memo.put(1, 0L); // Not strictly necessary if we only calculate for n > 1
                } else if (!memo.containsKey(n)) {
                    // Recursive step with memoization
                    long count;
                    if (n % 2 == 0) {
                        count = 1 + memo.getOrDefault(n / 2, 0L);
                    } else {
                        count = 1 + (long) (3 * n + 1);
                    }
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // Use memoized result
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
