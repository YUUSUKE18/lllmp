import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        int count = 0;
        long totalSum = 0L; // Using long to prevent overflow during accumulation, though problem states result fits in 64-bit
        
        String[] parts = line.trim().split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                distinctNumbers.add(num);
                
                // Check if this number was already counted in the set iteration logic? 
                // No, we need to count occurrences. The Set approach above only adds unique ones.
                // We should iterate and process each valid integer found.
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // Re-evaluate: The requirement is "count of distinct integers" vs "sum". 
        // Wait, re-reading carefully: "重複を除いた整数について、個数と合計を求めます。"
        // This means for the set of UNIQUE numbers found in input.
        // 1. Count = How many unique numbers exist? (e.g., if input is 1,2,3 -> count=3)
        // OR does it mean sum their frequencies after removing duplicates? 
        // "重複を除いた整数" implies we consider the set of distinct values present in the original list.
        // Usually this phrasing means: Take the unique elements from the input array/list.
        // Then calculate properties based on that resulting collection (which is just a Set).
        
        // Let's re-read standard interpretations for such problems.
        // "重複を除いた整数" -> The integers after removing duplicates. 
        // So if input: 1,2,2,3 -> Unique set: {1, 2, 3}.
        // Count of these unique numbers = 3.
        // Sum of these unique numbers = 6.
        
        // However, there is an ambiguity: Does "合計" mean sum of the values themselves? 
        // Yes, usually. If it meant sum of frequencies, it would say "出現回数の和".
        // So for input {1, 2, 3}, count=3, sum=6.
        
        // Wait, another interpretation: Maybe it wants to process each number in the original list? 
        // But it says "重複を除いた整数について" (Regarding integers after removing duplicates).
        // This strongly suggests we work on the set of unique values found.
        
        long currentSum = 0;
        int distinctCount = 0;

        for (String part : parts) {
            if (part.isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // We need to know which numbers are unique. 
                // Since we iterate once, let's just collect them into a Set first? 
                // Or use the set logic directly.
                distinctNumbers.add(num);
                // If we strictly follow "Regarding integers after removing duplicates", 
                // then for each UNIQUE number found in the input stream (conceptually), 
                // does it appear once or multiple times? 
                
                // Let's assume the most logical interpretation:
                // Input: 1,2,3 -> Unique set {1,2,3}. Count=3. Sum=6.
                // Input: 1,2,2,3 -> Unique set {1,2,3} (since duplicates removed). 
                // The phrase "重複を除いた整数" defines the subject of calculation.
                // So we calculate count and sum over the SET of unique numbers found in input.
                
            } catch (NumberFormatException e) {
                continue;
            }
        }

        distinctCount = distinctNumbers.size();
        
        for(int num : distinctNumbers) {
            currentSum += num;
        }

        System.out.println("count=" + distinctCount + " sum=" + currentSum);
    }
}
