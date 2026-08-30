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
                    // Memoization is implicitly handled by the map if we store results, 
                    // but for this specific problem structure (iterative transformation), 
                    // we calculate the path length directly.
                    // We will memoize the result for future use.
                    memo.put(n, 0L);
                } else if (!memo.containsKey(n)) {
                    // Recursive/Iterative calculation with memoization
                    long steps = 0;
                    int current = n;
                    
                    // Use a temporary map or direct recursion/iteration to find the steps
                    // Since the problem asks for the number of steps to reach 1, 
                    // we calculate the path length for the current n.
                    
                    // We use a temporary path tracking to avoid deep recursion if we were to use recursion,
                    // but since we are calculating the steps for *this* n, we can use iteration.
                    
                    // To correctly implement the memoization for the total count, 
                    // we need a function that calculates steps(n) and updates totalCount.
                    
                    // Let's redefine the goal: calculate steps(n) and add it to totalCount.
                    
                    // Since the transformation is related to the Collatz conjecture, 
                    // we calculate the steps iteratively for the current n.
                    
                    int tempN = n;
                    long currentSteps = 0;
                    
                    // We need to ensure we don't enter an infinite loop if the problem implies 
                    // the standard Collatz sequence behavior (which is assumed here).
                    // Since we are only asked for the steps to reach 1, we follow the rules.
                    
                    while (tempN != 1) {
                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        currentSteps++;
                    }
                    
                    totalCount += currentSteps;
                    memo.put(n, currentSteps);

                } else {
                    // If memoized, just add the stored value
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
