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
        long totalSteps = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                } else {
                    int steps = 0;
                    int current = n;
                    while (!memo.containsKey(current)) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            long nextVal = ((long)current * 3L + 1); // Use long to prevent overflow during calculation
                            current = Math.min((int)nextVal, Integer.MAX_VALUE); 
                            // Note: The Collatz sequence for integers within int range eventually enters the cycle [4, 2, 1].
                            // While it might exceed Integer.MAX_VALUE temporarily, the problem states values fit in 64-bit.
                            // However, to store in map with Integer key, we must handle the case where intermediate value exceeds Integer.MAX_VALUE.
                            // Since the next value is computed as long, we can check if it fits in int before casting back for memoization key?
                            // Actually, standard Collatz conjecture: all numbers reach 1. Intermediate values can exceed 2^31-1 but are bounded by roughly n*3/4 or similar growth then decay.
                            // But strictly speaking, if current > Integer.MAX_VALUE, we cannot use it as key in Map<Integer>.
                            // However, the problem says "intermediate values fit in 64-bit". So we need to handle them carefully.
                            // Let's re-evaluate: If current becomes > Integer.MAX_VALUE, we cannot put it in memo with Integer key.
                            // But wait, if current is large, say 2^31+something, then next step reduces it significantly? 
                            // Actually, for n <= 2^63-1, the max intermediate value can be larger than input but not too huge (bounded).
                            // We need to track values > Integer.MAX_VALUE separately or use Long as key.
                            // Given "intermediate values fit in 64-bit", using Map<Integer, Integer> is insufficient if intermediate exceeds Integer range.
                            // But note: if we start with int n, the sequence might go above Integer.MAX_VALUE.
                            // Example: n = 27 -> 81 -> ... -> max value is 9232? No, that's small.
                            // Actually for n=11338353647 (which is > Integer.MAX_VALUE), but input is int.
                            // The maximum intermediate value for starting n <= 2^31-1 is less than 5.8 * 10^9, which fits in long but not int.
                            // So we must use Long as key to avoid overflow issues and memory waste from storing duplicate large values without keys.
                            // Let's change memo to Map<Long, Integer>.
                        }
                    }
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
