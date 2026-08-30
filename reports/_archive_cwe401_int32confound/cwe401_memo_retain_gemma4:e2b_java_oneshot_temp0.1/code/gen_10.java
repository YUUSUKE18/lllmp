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
                    // Recursive step with memoization
                    long nextN;
                    if (n % 2 == 0) {
                        nextN = n / 2;
                    } else {
                        nextN = 3 * n + 1;
                    }

                    // Calculate steps for n by adding 1 to the steps for nextN
                    long stepsForNextN = memo.getOrDefault(nextN, 0L);
                    long steps = 1 + stepsForNextN;
                    
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    // If already memoized, just add the stored value
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
