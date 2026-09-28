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
                    // Base case: if n is 1, the number of steps is 0.
                    // We don't add this to totalCount because the problem asks for the steps 
                    // to reach 1, and the process stops there. The steps are counted during the transformation.
                    // If the query is n=1, the number of steps is 0.
                    // We will calculate the steps for n > 1.
                    // If the problem implies we must count the steps taken *from* n *to* 1, then for n=1, steps=0.
                    // Let's follow the rule: "n が 1 のときの手数は 0 です。"
                    // If n=1 is a query, the steps are 0.
                    // Since the goal is to find the steps for *each* query, we calculate the steps for n.
                    // If n=1 is a query, steps = 0.
                    // We don't add to totalCount unless the problem implies we sum up the steps for all queries.
                    // "すべてのクエリの手数の合計を求めます。" -> Sum of steps for each query.
                    
                    // If n=1, steps = 0.
                    totalCount += 0;
                    continue;
                }

                // Check memoization
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // Calculate steps using memoization (Collatz sequence)
                long current = n;
                long steps = 0;
                
                // Use a temporary map for the current path calculation to detect cycles if memoization was not perfect, 
                // but since we are guaranteed to reach 1 for positive integers, simple recursion/iteration with memoization is fine.
                
                // We use an iterative approach to calculate the steps and populate the memo map.
                // Since we are calculating the path from n to 1, we need to store the path.
                
                // To avoid deep recursion and ensure memoization works correctly for the sum, 
                // we calculate the path iteratively.
                
                // We need to handle the possibility of intermediate values exceeding 32-bit range, 
                // which is fine for Long.
                
                // To correctly implement the memoization for the entire sequence, we need to ensure that 
                // when we calculate steps(n), we recursively call steps(n/2) or steps(3n+1).
                
                // Let's redefine the memoization: memo[n] stores the steps from n to 1.
                
                // Iterative calculation for the current query n
                long tempN = n;
                long pathSteps = 0;
                // Use a stack or explicit path tracking if we want to avoid deep recursion for potentially large numbers, 
                // but standard Collatz sequence is usually fine with memoization.
                
                // Since we are calculating the steps for *this* query n, we use a temporary map for the current chain calculation
                // to detect cycles if we were doing a general search, but here we rely on the fact that the sequence eventually hits 1.
                
                // Let's use a recursive helper function with memoization for clarity and correctness of the Collatz problem structure.
                
                // Clear memoization for this specific query calculation if we were to use a recursive approach that doesn't rely on a global memoization state for the *sum*.
                // However, the requirement is to memoize the results. We will use the global memo map.
                
                // Recursive calculation with memoization:
                // This requires careful handling of the state. Since we are calculating the path *from* n, we are calculating the steps *for* n.
                
                // To correctly implement memoization for the sum, we must ensure that if we calculate steps(n), we store it, and if we later encounter n, we retrieve it.
                
                // Since the problem implies a single sequence of queries, we calculate the steps for n and add it to the total.
                
                // We use a stack/recursion to find the steps for n.
                
                // We will use a temporary map for the current calculation to detect cycles (though unlikely in Collatz) and to ensure we are calculating the path correctly.
                
                // Re-implementing the calculation to be safe and memoized:
                
                // We will use a stack for the path and a temporary map to store the path history to avoid recomputing subproblems within this single query calculation, 
                // relying on the global memo for results already computed.
                
                // Since we are calculating the steps for n, we can use a stack/recursion and update the global memo map.
                
                // Let's use a stack for the current path to find the steps from n to 1.
                java.util.Stack<Long> stack = new java.util.Stack<>();
                stack.push(n);
                
                // Temporary path tracking for the current query to avoid infinite loops if we were to re-enter this calculation path, 
                // although the memoization should handle this globally.
                java.util.Set<Long> currentPath = new java.util.HashSet<>();
                currentPath.add(n);
                
                long currentStep = 0;
                boolean reachedOne = false;
                
                while (!stack.isEmpty()) {
                    long currentVal = stack.pop();
                    
                    if (currentVal == 1) {
                        // We found the end. We need to count the steps. 
                        // The stack approach naturally finds the path, but counting steps requires tracking the path length.
                        // A simpler iterative approach is better for counting steps.
                        break; // Exit the stack loop and switch to iterative path finding below.
                    }
                    
                    // Iterative path finding:
                    long temp = n;
                    long steps_n = 0;
                    
                    // If we are here, we are calculating steps(n) from scratch.
                    // We must ensure we don't re-enter the memoization logic inside this block if we use recursion.
                    
                    // Let's switch to a direct, memoized recursive call which is the standard way for Collatz sequence.
                    
                    // Since we are inside the loop, we must calculate steps(n) and add it to totalCount.
                    
                    // Clear the loop and use recursion:
                    
                    // We must ensure that the recursive calls update the global memo map before we return.
                    
                    // Since we are inside the main loop, we only need to calculate steps(n) once.
                    
                    long result = calculateSteps(n, memo);
                    totalCount += result;
                    
                    // Memoization is handled inside calculateSteps.
                    
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * Calculates the number of steps required to reach 1 from n using the Collatz conjecture rules,
     * utilizing memoization.
     * @param n The starting integer.
     * @param memo The map to store computed results.
     * @return The number of steps to reach 1 from n.
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }

        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            // 3n + 1. Since n can be large, 3n+1 might overflow a 32-bit int, but fits in 64-bit long.
            // The problem states intermediate values fit in 64-bit, so we use long throughout.
            nextN = 3 * n + 1;
        }

        // Recursive call
        long steps = 1 + calculateSteps(nextN, memo);

        // Memoize the result
        memo.put(n, steps);

        return steps;
    }
}
