import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        BigInteger target = new BigInteger(targetLine.trim());

        Set<Long> seenValues = new HashSet<>();
        int pairCount = 0;
        boolean foundAnyPair = false;

        try (BufferedReader dataReader = br) {
            String line;
            while ((line = dataReader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;

                BigInteger valObj;
                try {
                    valObj = new BigInteger(line.trim());
                } catch (NumberFormatException e) {
                    continue;
                }

                BigInteger targetMin = target.min(valObj); // target - valObj

                Long minValLong = targetMin.longValue(); // This might be wrong if target/val exceeds long
                // Wait, BigInteger arithmetic on potentially large numbers.
                // Logic: target - val should exist in seen set? No, we need (target - val) to be in seen.
                // So we need to check if (target.subtract(valObj)) exists in seen.
                
                // To handle large numbers correctly, use BigInteger for the calculation and key lookup.
                // But Set<Long> is slow for huge data if many distinct values. 
                // However, 2 summing pairs problem with n up to ~10^6 usually requires HashSet.
                // Since inputs can be 64-bit integers, but could theoretically be larger? 
                // "値と個数はいずれも 64bit 整数の範囲に収まります" -> Values are within 64-bit integer range.
                // So we can store as Long.
                
                BigInteger needed = target.subtract(valObj);
                
                // Check if (needed) is in seen set. 
                // But wait, BigInteger might not fit in Long if the problem says "64bit integer" applies to input values?
                // If inputs are <= 2^63-1 or -2^63..2^63-1, then we can use Long.
                // Let's assume inputs fit in long.
                
                BigInteger bigNeeded = target.subtract(valObj);
                if (bigNeeded.longValue() != null) { // Just to ensure it fits
                     // Check if needed is in seen
                     // We need a Set of BigIntegers? Or trust Long range?
                     // "値...64bit integerの範囲" -> Values fit in long.
                     // So target also fits in long? Not necessarily, sum can overflow long if not careful? 
                     // But typically in such problems, the answer pair sums to target.
                     // If values are within 64-bit int range, and they sum to target, then target is within 128-bit approx.
                     // BUT: "値と個数はいずれも 64bit 整数の範囲に収まります" -> The PAIRS COUNT fits in 64bit, and VALUES fit in 64bit.
                     // It does NOT say TARGET fits in 64bit. But if values are within long range, 
                     // then target can be up to ~9e18 * 2 = 1.8e19 which exceeds Long.MAX_VALUE (9e18).
                     // So we must use BigInteger for the logic check.
                     
                     // Using Set<Long> is risky if needed > Long.MAX_VALUE. 
                     // Let's use Set<BigInteger>.
                }
                
                // Re-evaluate strategy with BigInteger Set
            }
        } catch (Exception e) {
            return;
        }
        
        // Correct approach:
        // Use HashSet<BigInteger> for seen values.
    }
}
