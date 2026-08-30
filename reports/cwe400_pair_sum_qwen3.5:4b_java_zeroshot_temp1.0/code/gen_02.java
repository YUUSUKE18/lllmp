import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = reader.readLine();
        if (targetLine == null) return;
        
        try {
            BigInteger target = new BigInteger(targetLine.trim());
        } catch (NumberFormatException e) {
            // Target line is not a number, but spec says to ignore non-integer lines. 
            // Since we read the first line for target and process others as pairs of integers,
            // if the first line is invalid, we proceed assuming no valid target or handle gracefully.
            // However, strict interpretation: if input doesn't follow format, behavior is undefined by spec but we assume valid per "spec" implication.
            return;
        }

        List<Integer> numbers = new ArrayList<>();
        String line;
        while ((line = reader.readLine()) != null) {
            // Ignore empty lines or non-integer lines
            if (line.trim().isEmpty() || !Character.isDigit(line.charAt(0))) continue;
            
            try {
                int num = Integer.parseInt(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // Ignore lines that are not integers
            }
        }

        BigInteger sum = target.subtract(BigInteger.ZERO);
        
        // Use a boolean array to track which numbers have been seen. 
        // Since values fit in 64-bit integer range, we cannot use them as direct indices if they are negative or large.
        // However, the problem statement says "sum of two equals target", not necessarily that values are small.
        // We need an efficient way to find pairs. A HashSet approach is O(n^2) worst case if we iterate all pairs, but with HashSet lookup it's O(n).
        // Actually, for each number in the list, we calculate needed = target - number and check if needed exists in the set of previously seen numbers.
        // This ensures we count pairs {i, j} where i < j, avoiding double counting or missing ones.

        List<Integer> seen = new ArrayList<>();
        
        BigInteger pairsCount = BigInteger.ZERO;
        
        // Iterate through each number to form a pair with a previously seen number
        for (int num : numbers) {
            BigInteger val = BigInteger.valueOf(num);
            BigInteger needed = target.subtract(val);
            
            // Check if 'needed' exists in the set of previously processed numbers
            boolean exists = seen.stream().anyMatch(v -> BigInteger.valueOf(v).equals(needed));
            
            if (exists) {
                pairsCount = pairsCount.add(BigInteger.ONE);
            }
            
            // Add current number to the set of seen numbers
            seen.add(num);
        }

        System.out.println("pairs=" + pairsCount);
    }
}
