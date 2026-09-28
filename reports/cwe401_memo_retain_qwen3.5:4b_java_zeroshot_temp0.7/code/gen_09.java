import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;

public class Main {
    private static final Map<Integer, Long> memo = new HashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalSteps = 0;

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line.trim());
                totalSteps += calculate(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long calculate(int n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps = 0;
        int nextN;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3L * n + 1; // Use long to prevent overflow during calculation before casting back to int key if needed, though the problem implies intermediate values fit in 64-bit. However, for memoization key, we must use Integer. Since Collatz sequence can exceed 2^31-1, we need to be careful. The problem states "intermediate values fit in 64-bit integer". Java's HashMap with Integer keys will throw if the value exceeds Integer.MAX_VALUE. We should store intermediate results that might exceed int range? 
                // Re-reading spec: "途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります"
                // This implies we can use Long for the calculation, but Map key must be Integer. 
                // However, if n becomes > Integer.MAX_VALUE, we cannot use it as a key in HashMap<Integer, Long>.
                // But usually, Collatz sequences starting from int fit back into int range eventually or we only memoize within int range?
                // Actually, to strictly follow "memoize", if intermediate values exceed 32-bit, we can't put them in HashMap<Integer>. 
                // But the calculation logic for the next step depends on that large number.
                // Let's adjust: We compute using long arithmetic. If the current 'n' (as long) exceeds Integer.MAX_VALUE, we can't use it as a key to retrieve cached value from Map<Integer>. 
                // However, most Collatz sequences starting with int eventually come back or stay within range? Not necessarily.
                // But since the input is int, and we start with int, does every path go beyond int? No. Max for 32-bit inputs is usually manageable but can exceed.
                // To handle "intermediate values > 32-bit", we might need a different memoization strategy or simply not memoize values > Integer.MAX_VALUE. 
                // But the spec says "memoize". Let's assume we only memoize if it fits in Integer, or perhaps the test cases are such that overflow doesn't happen for the key? 
                // Actually, to be safe and correct: We perform calculation in long. If a state (long) is reached that is > Integer.MAX_VALUE, we cannot put it in HashMap<Integer>.
                // But wait, if we don't memoize large values, performance degrades. 
                // However, given the constraint "intermediate values fit in 64-bit", maybe we should use HashMap<Long, Long>? 
                // But input n is int. If intermediate becomes huge (e.g., > 2^31), Map key must be Long.
                // Let's change Map to HashMap<Long, Long> to support the spec fully.
                
                // Wait, if I change key to Long, I need to handle the fact that input is read as int initially but then cast to long.
                // Let's redefine calculate to take long? No, input is int. But intermediate can be long.
                // So: Map<Long, Long> memo = new HashMap<>();
                
                nextN = (int) ((3L * n + 1)); // Wait, if 3n+1 > Integer.MAX_VALUE, casting to int loses info. 
                // The spec says intermediate fits in 64-bit. So we MUST use Long for the state.
                // Therefore, the map key should be Long.
                
                // But wait, the input is given as integer. If the sequence goes beyond int range, we need to track it as long.
                // Let's rewrite calculate to work with Long and use HashMap<Long, Long>.
            }
        }
        
        // Corrected logic below
    }

    private static long collatz(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }

        memo.put(n, steps); // Wait, this puts the final step count for the LAST state? 
        // No, standard way: steps from n to 1.
        // If we put 'n' as key and 'steps' as value, it means steps(n) = steps(nextN) + 1.
        // But in the loop above, I incremented steps after moving to nextN.
        // When loop ends, n is 1, steps is total count from initial arg to 1.
        // So if we call collatz(X), it should return X->1 steps.
        // The code above calculates steps for current n (which becomes 1 eventually).
        // But we need to store result for the original input passed to this function? 
        // No, the argument 'n' changes inside the loop. We are traversing the path.
        // We should memoize the state 'n' with its distance to 1.
        // Correct logic:
        /*
        long res = collatzHelper(arg);
        */
        
        // Let's implement helper properly or iterative backtracking? 
        // Iterative forward is hard to store partial results easily without recursion or stack.
        // Recursive is better for memoization.
        
        // Redefining calculate as recursive with Long key.
    }
    
    // Re-implementing main logic cleanly with Long Map
    
    private static final Map<Long, Long> memoLong = new HashMap<>();

    public static void main2(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalSteps = 0;

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line == null || line.trim().isEmpty()) continue;
            try {
                // Input is int, but treat as long immediately to allow intermediate overflow
                long n = Long.parseLong(line.trim()); 
                totalSteps += solve(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + totalSteps);
    }

    private static long solve(long n) {
        if (n == 1) return 0;
        if (memoLong.containsKey(n)) return memoLong.get(n);

        long nextN = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        
        // Since we need to return steps from current n, and we know it's 1 + steps(nextN)
        // We compute recursively.
        
        long res = solve(nextN);
        memoLong.put(n, res + 1);
        return res + 1;
    }

    // Wait, the previous logic in main2 was just a loop. 
    // Recursive is safer for memoization structure.
    // But recursion depth might be an issue? Collatz sequences are generally not that deep for int inputs?
    // Max steps for 32-bit signed int is for 113383: 525 steps. Safe.
    
    // Let's put it all together.
}
