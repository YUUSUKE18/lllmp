import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        String line;
        Set<Long> seen = new HashSet<>();
        long count = 0;
        long maxValSeen = Long.MIN_VALUE; // Use to initialize, though strictly not needed for logic if we handle empty correctly
        
        while ((line = br.readLine()) != null) {
            long[] nums = parseLongs(line);
            
            if (nums.length == 0) {
                continue;
            }

            // Sort the current line's numbers to use two-pointer technique efficiently within the group
            java.util.Arrays.sort(nums);

            for (int i = 0; i < nums.length - 1; i++) {
                long firstNum = nums[i];
                
                // We are looking for a pair (a, b) from the entire sequence so far such that a + b == target.
                // The problem implies we need to count pairs formed by numbers at different positions in the input stream.
                // However, re-reading the specification: "2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数"
                // This usually means global counting of pairs (i, j) where i < j and a[i] + a[j] == target.
                // Given the constraint "adversarial large input", O(N^2) is too slow. We need a set-based approach to find complements.
                
                long complement = target - firstNum;

                if (seen.contains(complement)) {
                    count++;
                }
                
                seen.add(firstNum);
            }
        }
        
        System.out.println("pairs=" + count);
    }

    private static long[] parseLongs(String line) {
        String[] parts = line.trim().split("\\s+");
        if (parts.length == 0) return new long[0];
        long[] nums = new long[parts.length];
        for (int i = 0; i < parts.length; i++) {
            try {
                nums[i] = Long.parseLong(parts[i]);
            } catch (NumberFormatException e) {
                // Ignore non-integers? Specification says "integers are arranged", implying valid integers.
                // But "lines that cannot be interpreted as integers should be ignored". 
                // If a line has mixed content, we should probably only process the numbers found or treat the whole line as invalid if any number is invalid?
                // Usually in CP problems, if a line contains non-integers, those lines are skipped entirely or processed as empty.
                // Let's assume valid integers per line unless specified otherwise for robustness: skip invalid token and continue processing numbers on same line?
                // Or simpler: just parse what is valid. But the spec says "lines that cannot be interpreted as integers". 
                // If a line has garbage, maybe it shouldn't be processed at all? Let's stick to parsing only numbers and ignoring lines with NO numbers.
            }
        }
        return nums;
    }
}
