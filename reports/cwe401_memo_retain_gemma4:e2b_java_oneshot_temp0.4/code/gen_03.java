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

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // Calculate steps for n
                long current = n;
                long steps = 0;
                Map<Long, Long> path = new HashMap<>(); // To store intermediate steps for memoization

                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // If we hit a memoized value, use its result and update path
                        steps += memo.get(current);
                        // We need to trace back or ensure the memoization stores the total steps from n to 1.
                        // Since the problem asks for the total steps for *each* query, and we are calculating for a single n,
                        // we should calculate the steps from n to 1.
                        // If we use memoization for the recursive calls, we need to be careful about how we aggregate the total.

                        // Let's re-read the requirement: "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
                        // This implies we calculate the number of steps for *this* n, and add it to the total.

                        // Let's restart the calculation for this n, assuming memoization stores the steps from that number to 1.
                        break; // Exit the inner loop if we hit a memoized value for the current calculation path
                    }

                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // If we reached 1, memoize the result for n
                if (current == 1) {
                    memo.put(n, steps);
                    totalCount += steps;
                }
                // Note: The problem statement implies that the sequence of operations is applied *repeatedly* to n, 
                // and we count the number of operations until 1 is reached. This is the Collatz sequence length.

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
