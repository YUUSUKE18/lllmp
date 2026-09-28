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
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // Base case: n=1, count is 0
                    long count = 0;
                    totalCount += count;
                    memo.put(1L, count);
                    continue;
                }

                if (memo.containsKey(n)) {
                    // Memoized result
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // Recursive step
                long nextN;
                if (n % 2 == 0) {
                    nextN = n / 2;
                } else {
                    nextN = 3 * n + 1;
                }

                // Recursive call and memoization
                long count = 1 + memo.get(nextN);
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        System.out.println("total=" + totalCount);
    }
}
