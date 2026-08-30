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
                    // but for this specific problem structure (iterative calculation), 
                    // we calculate the path directly.
                    continue;
                }

                // Check memoization
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // Calculate steps iteratively
                long steps = 0;
                int current = n;
                
                // We use a temporary map to store intermediate results for this path if needed, 
                // but since we are only interested in the total count for *this* n, 
                // and the problem implies a sequence of operations until 1 is reached, 
                // we calculate the path length.
                
                // Since the problem asks for the number of steps to reach 1, 
                // we simulate the process.
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // Store result and update total
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
