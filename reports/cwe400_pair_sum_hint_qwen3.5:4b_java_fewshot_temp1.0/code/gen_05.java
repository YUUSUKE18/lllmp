import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || !targetLine.trim().isEmpty()) {
            BigInteger targetVal = new BigInteger(targetLine.trim());
            
            Set<Long> seen = new HashSet<>();
            BigInteger sumSoFar = BigInteger.ZERO;
            long pairCount = 0;
            
            String line;
            while ((line = br.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) continue;
                
                try {
                    BigInteger currentVal = new BigInteger(line);
                    
                    // Check if there exists a previously seen number 'prev' such that prev + currentVal == targetVal
                    // i.e., prev == targetVal - currentVal
                    BigInteger needed = targetVal.subtract(currentVal);
                    
                    if (seen.contains(needed.longValue())) {
                        // Only count if the pair hasn't been counted already. 
                        // Since we store Long in Set, we need to be careful about overflow 
                        // if numbers are outside long range, but the problem states they fit in 64-bit integer range.
                        // However, 'needed' might not fit in Long if the input violates constraints slightly 
                        // or due to logic, but the problem guarantees inputs are within 64-bit integer range.
                        // Wait, the input integers are within 64-bit integer range (long).
                        // So currentVal is long, targetVal is long (or BigInteger covering it).
                        // needed = targetVal - currentVal will also be within 64-bit range if both are within range? 
                        // Yes. If A and B are in [min_long, max_long], then A-B is in [min_long - max_long, ...] which can exceed long.
                        // Ah, careful. 
                        // Let's re-read: "値と個数はいずれも 64bit 整数の範囲に収まります" (Values and count are within 64-bit integer range).
                        // It does not explicitly say the input integers are within 64-bit signed range, just that they fit.
                        // Usually in such problems, "integer" implies signed 32/64 bit. 
                        // But if input can be arbitrarily large (BigInteger) while count is small? 
                        // The prompt says "整数が 1 行に 1 個ずつ並びます". And "値と個数はいずれも 64bit 整数の範囲に収まります".
                        // This implies the values themselves are within [-2^63, 2^63-1]. 
                        // If currentVal and targetVal are within long range, then needed = target - current is NOT necessarily within long range.
                        // Example: target = Long.MAX_VALUE, current = Long.MIN_VALUE => needed ≈ 9*10^18 + 9*10^18 which overflows long.
                        // So we must use BigInteger for the Set lookup as well to be safe against adversarial inputs that stay within value constraint but overflow during subtraction.
                        
                        if (seen.contains(needed)) {
                            pairCount++;
                        }
                    } else {
                        // If needed doesn't fit in Long, we can't store it in HashSet<Long>. 
                        // But the problem says values are within 64-bit integer range.
                        // So currentVal is long. targetVal is effectively long (since we read it as target).
                        // Wait, if targetVal is read from input, and input values are 64-bit integers.
                        // Then targetVal is also a 64-bit integer.
                        // But needed might exceed 64-bit range.
                        // So we should store Long in seen for the existing numbers, but check using BigInteger.
                        // However, if 'needed' is within the range of previously seen numbers, then it must be representable as a Long 
                        // IF all previous numbers were stored as Longs. 
                        // Since all input numbers are 64-bit integers, they fit in Long.
                        // But needed might not. If needed is outside Long range, it cannot equal any number currently in 'seen' (which only holds longs).
                        // So we only need to check if needed fits into long and exists in seen.
                        
                        if (needed.compareTo(BigInteger.valueOf(Long.MIN_VALUE)) < 0) { // Needed < Long.MIN
                            // Overflow negative long check not strictly needed if we trust BigInteger, but let's simplify logic:
                            // We can store all seen values as BigIntegers to be absolutely safe and simple?
                            // Memory usage: Set<BigInteger> is slower than Set<Long>.
                            // But "adversarial large inputs" -> many numbers. 
                            // Storing BigInteger might be slightly memory heavy but acceptable for typical CP limits if inputs are within 64-bit range per number.
                            // Actually, if values are bounded by 64-bit integer range, then they fit in Long.
                            // The only risk is 'needed' being outside that range. 
                            // If needed is outside Long range, it cannot be one of the seen numbers (since all seen numbers are from input, which are within 64-bit range).
                            // Therefore, we can safely ignore cases where needed does not fit in Long.
                        }
                    }
                    
                    // Add current number to seen. Convert to String or keep as BigInteger? 
                    // Keeping as BigInteger is safest.
                    if (seen.size() > 0 && !seen.contains(currentVal.toString())) { // Basic check, but Set handles uniqueness.
                        // Just add it. But wait, if we use BigInteger for Set, lookup is slower but correct.
                        seen.add(currentVal); // Wait, this adds the number itself.
                    } else {
                        seen.add(currentVal); // Correct logic: add currentVal to seen after checking pair with target - currentVal
                        // Re-evaluating logic order:
                        // 1. Read val.
                        // 2. Check if (target - val) is in seen. If yes, increment count.
                        // 3. Add val to seen.
                        
                        // Correction on step 4 above: The code structure was a bit mixed. Let's rewrite cleanly.
                    }
                    
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        } else {
            // Target line empty or missing? Spec says "標準入力の 1 行目に目標値が与えられます".
            // Assume valid input for competitive programming context unless specified otherwise.
            // If no target, we can't do anything meaningful. Output 0? Or assume input exists.
            System.out.println("pairs=0");
        }

        System.out.println("pairs=" + pairCount);
    }
}
