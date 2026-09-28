import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[1 << 32]; // Store for n where 0 <= n < 2^32, but we need to handle larger values via recursion or a map.
        
        // However, the Collatz sequence for integers can produce numbers much larger than 2^32 before reducing back.
        // Using an array of size 2^32 is memory efficient for small numbers encountered early in the sequence.
        // Since intermediate values can exceed Integer.MAX_VALUE (positive 2^31), we must use long to represent the number 
        // when computing the next term, but the memoization array indices must be integers.
        // Note: If a value exceeds 2^32-1, it cannot be indexed in an int-based array.
        // Strategy: Use an int array for numbers that fit (most small numbers will), and handle larger ones dynamically or by checking bounds.
        // Actually, the Collatz conjecture suggests that all sequences eventually enter a cycle involving 4->2->1.
        // The maximum value reached before going down is known but can be large. 
        // However, for typical competitive programming inputs (even if large), the numbers that appear in the sequence are often manageable.
        // But to be safe against "adversarial" inputs where intermediate values might exceed 2^32-1:
        // We will use a Map only if necessary? Or rely on the fact that we only memoize the first steps?
        // Given the constraint of using standard libraries and potentially large inputs, a pure array of size 4*10^9 (too big for heap) is not feasible.
        // But wait, we can use an int[] array because most numbers in Collatz sequences quickly drop below 2^31.
        // Actually, the maximum value reachable starting from n <= Integer.MAX_VALUE is bounded. 
        // However, if n is close to Integer.MAX_VALUE and odd, 3n+1 might exceed Long.MAX_VALUE? No, 3*2^31 is approx 6*10^9 which fits in long.
        // But we need to index the memo table with int values. If an intermediate value exceeds Integer.MAX_VALUE, we cannot use it as an index.
        // A better approach: Since Java's HashMap might be slow or memory heavy for huge keys, and arrays are fast but limited size.
        // Let's reconsider: The problem says "values may exceed 32-bit integer range but fit in 64-bit".
        // So we cannot use a simple int[] array if intermediate values go beyond Integer.MAX_VALUE.
        // We can use an int[] array for caching results of the initial 'n' and any subsequent numbers that fall back into the int range?
        // Actually, many Collatz sequences do not produce values > 2^31 often, except for specific large inputs or early stages.
        // To be robust: We'll use a HashMap<Long, Integer> if we encounter numbers outside int range during calculation?
        // But wait, the requirement is "implement efficiently". 
        // Given the constraints and Java's GC behavior, a Hybrid approach might be too slow due to object creation in HashMap for every step.
        // Let's check: For any starting n <= Integer.MAX_VALUE, will the maximum value ever exceed Integer.MAX_VALUE significantly?
        # For example, start with n=27 -> reaches 9232 (fits). 
        # Some large primes might go higher. But note that once it drops below 2^31/2 or so, it fits.
        # However, if we encounter a value >= Integer.MAX_VALUE, we cannot use int[] index.
        
        // Alternative: Since n starts as an integer (read from input), and the operations are repeated until 1.
        // We can handle this with memoization using a Map<Long, Integer> for safety against overflow of int during indexing,
        # but to avoid overhead, we can try to keep it simple first: use int[] if value fits, else fallback logic?
        # Actually, let's just use a HashMap<Long, Integer> initialized lazily or with a size limit?
        # But for "practical time and memory", HashMap on every step might be TLE for millions of steps.
        
        // Let me check: Is there a known bound? Yes, it is conjectured that all sequences are bounded by something like 100n for odd n?
        # Not quite. The maximum ratio max/n is about 50-60 for known cases, so if n <= Integer.MAX_VALUE, max <= ~5e13 which fits in long.
        
        # Given that memory limit might be an issue with a full HashMap for all possible paths, 
        # let's assume the test cases are not adversially constructed to hit very large numbers repeatedly without reducing quickly.
        # However, to satisfy the requirement "values fit in 64-bit integer", we MUST use long for calculation and possibly a Map for memoization if values exceed int range.
        
        # But wait: We can optimize by using an int[] array for indices 0 to Integer.MAX_VALUE (size ~2 billion? Too big).
        # Only up to Integer.MAX_VALUE is too big (2GB+). The problem likely implies inputs are reasonable integers, but intermediate values could be large.
        # However, if the input n is within [0, Integer.MAX_VALUE], then most sequences stay relatively small.
        # Actually, we can just use a simple int[] array of size 1<<32? That's 4GB, which might be too much.
        # But maybe the test cases don't hit that far? Or perhaps we only need to store for n itself and intermediate values < Integer.MAX_VALUE?
        
        # Let's think differently: We can use a Map<Long, Integer> but clear it or reuse? No, we need to keep results.
        # Maybe the problem expects us to use int[] for indices < 2^31 and handle large numbers without memoization? 
        # Or perhaps the "adversarial" input won't cause overflow beyond what fits in long but will cause TLE if we don't memoize.
        
        # Actually, let's look at the problem again: "同じ整数が繰り返し現れるので、計算結果をメモ化".
        # This implies that some numbers appear multiple times across different queries or within the same query? 
        # Wait, each query is a separate n. The memoization should be global across all queries because intermediate values might be reused.
        
        # Given the memory constraints of typical competitive programming (256MB), storing a HashMap for all Collatz numbers encountered is risky.
        # But note: if we only memoize for values that are <= Integer.MAX_VALUE, and treat larger values by not caching? 
        # Actually, if a value exceeds Integer.MAX_VALUE, it will eventually come back down.
        
        # Let's try this strategy: Use an int[] array of size 2^32 (approx) if we can fit it? 
        # Wait, the input n is an integer (fits in long, but problem says "n fits in 64-bit", and inputs are read as integers).
        # The input format says "1以上の整数" (integers >= 1). It doesn't specify range, but typically up to Integer.MAX_VALUE.
        
        # Let's use a hybrid: int[] memo of size 1<<30? Or just use Long and check bounds.
        # Actually, let's assume that for inputs within [1, Integer.MAX_VALUE], the maximum intermediate value is bounded by roughly 5e13 (fits in long).
        # But we cannot index > Integer.MAX_VALUE in int[]. 
        # So: 
        // - If current val <= Integer.MAX_VALUE, check memo[val].
        // - If current val > Integer.MAX_VALUE, compute next step without storing (or store if it comes back?).
        
        // However, the most efficient way given "standard libraries only" and "time/memory":
        # Use a single long array? No. 
        # Use a HashMap<Long, Integer> but only for values that we encounter repeatedly? 
        # Actually, many Collatz sequences do not share many common intermediate nodes unless they are very small.
        
        # Re-reading: "同じ整数が繰り返し現れる" (the same integer appears repeatedly). This suggests overlap between queries or within one query path?
        # Within one query: The sequence is unique for a given start n, so no overlap within one path except the cycle 4->2->1.
        # Between queries: Different starts might converge to the same large number or small number.
        
        # Given the difficulty of predicting exact overlaps with large numbers, and memory constraints,
        # we will use a HashMap for memoization but limit its size? Or just let it grow if necessary? 
        # But the problem says "efficient". Let's assume inputs are up to 10^9 and intermediate values stay under reasonable bounds for most cases.
        
        # Wait! There is a trick: If n is odd, next is 3n+1. If even, n/2.
        # If n > Integer.MAX_VALUE, then 3n+1 might overflow long? No, problem says fits in 64-bit (long).
        # So we can safely compute with long.
        
        # Implementation plan:
        // Use a HashMap<Long, Integer> for memoization because we don't know the range of intermediate values.
        # But to avoid TLE on many steps without caching, and to satisfy "efficient":
        # Maybe the test cases are such that overlaps occur mostly among smaller numbers?
        
        # However, there's a known fact: The maximum value for n <= 10^9 is not huge compared to n (like 50n). 
        # So 50 * 10^9 = 5e10 which fits in long but exceeds int.
        # Therefore, we MUST use long keys. 
        # Using a HashMap<Long, Integer> is the correct approach. 
        # But to optimize memory, we can clear the map? No, we need global memoization.
        # Is there a better way? Maybe an array of size 1<<32 is too big (4GB). 
        # So HashMap is the only viable option for large values.
        
        // Final decision: Use HashMap<Long, Integer> for memoization. 
        // But wait, if the number of queries is huge and no overlap occurs, HashMap overhead might be high.
        // However, the problem says "same integer appears repeatedly", implying overlaps exist.
        # So HashMap is justified.
        
        // Let's code with HashMap. But to be extra cautious about performance, we can use a custom open-addressing hash map? 
        # No, standard libraries only. Arrays.asList or LinkedHashMap? No, just Collections.HashMap.
        
        // Wait, one more thing: The problem says "n fits in 64-bit". So input is long.
        // But the loop condition: "until it reaches 1". The steps are stored as integers (count).
        
        # Let's write the solution using a static Map for global memoization.

    }
    
    // ...
}
