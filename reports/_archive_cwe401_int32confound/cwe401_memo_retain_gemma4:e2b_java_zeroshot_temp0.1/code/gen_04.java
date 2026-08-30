import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    long count = 0;
                    totalCount += count;
                    // Memoize the result for n=1
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Recursive step with memoization
                    long count;
                    if (n % 2 == 0) {
                        count = memo.get(n / 2) + 1;
                    } else {
                        count = memo.get(3 * n + 1) + 1;
                    }
                    memo.put(n, count);
                } else {
                    // Already memoized
                    count = memo.get(n);
                }
                
                totalCount += count;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
