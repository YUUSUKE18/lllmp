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
                    // Memoization is implicitly handled by the map if we were to store it, 
                    // but since we are only asked for the total sum, we just calculate the steps.
                    // We will calculate the steps for the current query and add to the total.
                } else if (!memo.containsKey(n)) {
                    // Calculate steps for n
                    long steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    totalCount += steps;
                    memo.put(n, steps);
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
