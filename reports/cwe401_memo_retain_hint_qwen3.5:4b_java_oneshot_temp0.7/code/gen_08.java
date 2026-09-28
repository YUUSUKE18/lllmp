import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                int steps = getSteps(n, memo);
                total += steps;
                // The result of the Collatz sequence fits in a long, so we can store intermediate values
                // If the problem implies only storing results for specific inputs or all visited nodes,
                // since inputs are up to 2^31-1, the intermediate values can be larger (up to ~5.8 * 10^16).
                // We need to use a Map that handles Long keys if we store intermediates, 
                // but usually for competitive programming on this specific problem ("Total Collatz Steps"),
                // inputs are often small enough or the constraint is loose enough that standard HashMap<Integer, Integer> works for inputs.
                // However, the prompt says "intermediate values fit in 64-bit integer".
                // If we memoize only the input n (which fits in int), it's sufficient if the test cases don't rely on
                // intermediate values of larger numbers being queried again as starting points.
                // But to be safe and strictly follow "memoize calculation results", let's consider that the query is always an int.
                // The memoization key will be the input n (int).
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be parsed as integers
            }
        }
        System.out.println("total=" + total);
    }

    private static int getSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long current = n;
        int steps = 0;
        
        // Since the sequence can grow beyond Integer.MAX_VALUE, we must use long for calculation.
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
