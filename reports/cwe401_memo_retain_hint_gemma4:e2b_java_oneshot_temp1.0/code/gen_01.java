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
            if (line == null) break;

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    totalCount += 0;
                    continue;
                }

                if (!memo.containsKey(n)) {
                    // Calculate steps using memoization (Collatz sequence)
                    long steps = 0;
                    long current = n;
                    
                    // Since the problem asks for the number of steps to reach 1, 
                    // we calculate the sequence length.
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    // Memoize the result for n
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    // Use memoized result
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid long integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
