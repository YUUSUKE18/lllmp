import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n < 0 || n > Integer.MAX_VALUE) continue;
                
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                } else {
                    int steps = 0;
                    long current = n;
                    while (current != 1) {
                        if (n < 0) break; // Safety check, though problem says positive integers
                        int nextVal = (int)((long)current / 2);
                        current = nextVal;
                        steps++;
                        if (memo.containsKey((int)nextVal)) {
                            n = memo.get((int)nextVal);
                            break; 
                        } else {
                            // Recalculate until we hit a known value or reach 1
                            int prev = n;
                            while (true) {
                                if (prev == 0) break; // Should not happen for positive integers starting from 1
                                long val = prev;
                                if (val % 2 == 0) val /= 2;
                                else val = 3L * val + 1;
                                
                                if (memo.containsKey((int)val)) {
                                    n = memo.get((int)val);
                                    break;
                                } else if (val == 1) {
                                    n = 0;
                                    break;
                                } else if (val > Integer.MAX_VALUE || val < 0) {
                                    // If it exceeds integer range, we need to track long values
                                    // But since the memo is for int keys, we can't store longs directly.
                                    // We'll simulate step-by-step with long but only memoize when it fits in int or hits 1.
                                    long temp = val;
                                    steps++;
                                    
                                    // Check if next step falls back into int range
                                    boolean canFitNext = false;
                                    long nextValTemp = (temp % 2 == 0) ? temp / 2 : 3L * temp + 1;
                                    
                                    if (nextValTemp >= 0 && nextValTemp <= Integer.MAX_VALUE) {
                                        canFitNext = true;
                                    } else {
                                        // If it stays out of bounds or we exceed, keep going
                                        // However, Collatz conjecture suggests it comes back down eventually.
                                        // We must track the actual long value during simulation.
                                    }
                                    
                                    // Re-simulate properly with long tracking
                                    long simVal = prev;
                                    int simSteps = 0;
                                    while (simVal != 1 && !memo.containsKey((int)simVal)) {
                                        if (simVal % 2 == 0) simVal /= 2;
                                        else simVal = 3L * simVal + 1;
                                        
                                        if (simVal >= 0 && simVal <= Integer.MAX_VALUE) {
                                            if (memo.containsKey((int)simVal)) {
                                                int stepsToKnown = simSteps + memo.get((int)simVal);
                                                n = stepsToKnown;
                                                break;
                                            } else {
                                                // Store the long value? No, map key is Integer.
                                                // We only store if it fits in int range for lookup optimization.
                                                // But we can't store longs as keys. So we have to simulate until we hit an int range value or 1.
                                                // Given the constraint "64bit integer range", we must handle values > Integer.MAX_VALUE.
                                                // Since we can't memoize longs easily without a separate map, and the problem asks to memoize 
                                                // same integers appearing repeatedly (implying inputs are ints), but intermediate values might be long.
                                                // Strategy: Simulate with long, but only memoize int intermediates if they repeat or hit 1.
                                                // Actually, since input n is int, and we want to memoize "same integers", 
                                                // the repeated occurrences will likely be within int range.
                                                // We'll simulate fully using Long as key temporarily? No, Java Map<Integer> only.
                                                // Let's use a custom approach: simulate until we hit 1 or an integer that is already in map.
                                                // If it goes out of int range, we can't store it in memo.get(n). 
                                                // But the problem says "same integers appearing repeatedly" - inputs are ints.
                                                // Intermediate values might be large, but eventually come back to <= Integer.MAX_VALUE.
                                                // We'll just simulate with long and check against memo periodically or when value fits.
                                                
                                                // Correct logic:
                                                // Start with n (int). Simulate step by step with long.
                                                // If current long value is within int range and in memo, we can break and add result.
                                                // If it goes out of range, continue simulating until it comes back or hits 1.
                                                // But we cannot store the large values in 'memo' because Key must be Integer.
                                                // So we only use memo for values <= Integer.MAX_VALUE.
                                                // This is safe because any cycle or return to small numbers will hit an int value.
                                                
                                                // Re-do simulation loop correctly:
                                                int stepsFromHere = 0;
                                                long val = prev;
                                                while (val != 1 && !memo.containsKey((int)val)) {
                                                    if (val % 2 == 0) val /= 2;
                                                    else val = 3L * val + 1;
                                                    stepsFromHere++;
                                                    
                                                    // If it comes back into int range, check memo
                                                    if (val >= 0 && val <= Integer.MAX_VALUE) {
                                                        if (memo.containsKey((int)val)) {
                                                            int knownSteps = memo.get((int)val);
                                                            n = stepsFromHere + knownSteps;
                                                            break;
                                                        }
                                                    } else {
                                                        // Still out of range, continue simulation
                                                        // But we need to avoid infinite loop if conjecture fails (unlikely but safe to stop?)
                                                        // For CP problems, assume Collatz holds.
                                                    }
                                                }
                                                memo.put(prev, stepsFromHere + n);
                                            } else {
                                                // Case where it never hits 1 or memo? 
                                                // We'll rely on the fact that it will eventually hit an int value or 1.
                                                // Let's restructure the loop to be cleaner.
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
