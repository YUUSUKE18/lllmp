import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Long> distinctNumbers = new HashSet<>();
        long totalSum = 0L;
        int count = 0;
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                long numValue = Long.parseLong(part.trim());
                
                // Check uniqueness before adding to sum and counting duplicates logic needs adjustment based on requirements: "unique integers" means we only count distinct ones. 
                // However, the requirement says "求 their unique integer's quantity and total". This implies each unique number is counted once in 'count', but if a number appears multiple times, does it add to sum?
                // Re-reading: 「重複を除いた整数」について、個数と合計を求めます。
                // Translation: For integers with duplicates removed (i.e., distinct set), find the quantity and total.
                // Interpretation A: Count how many unique numbers there are, AND what is their sum? 
                // If input is 10, 20, 30 -> count=3, sum=60. Correct.
                // If input is 10, 10, 20, 20 -> Unique: {10, 20}. Count=2. Sum = 10+20=30? 
                
                // Wait, the example in prompt for unique numbers "重複を除いた整数" usually implies set semantics where duplicates are removed entirely from consideration of both count and sum calculation based on strict reading of Japanese text:
                // For integers (after removing duplicates) -> find quantity (count of distinct elements?) and total (sum of those distinct elements). 
                
                // Alternative interpretation B: Count occurrences? No, it says "repeating excepted" first. So process is 10,20,30 or 10,20.
                // Let's assume strict Set behavior for both count and sum based on the wording order in Japanese context often used in such challenges (Count distinct items + Sum of those same distinct items). 
                
                long val = numValue;
                if (!distinctNumbers.contains(val)) {
                    totalSum += val;
                    count++; // Each unique number counts as 1 towards 'count'.
                    distinctNumbers.add(val);
                } else {
                     // If we strictly follow "for the integers after removing duplicates", then repeated ones are ignored for sum? 
                     // Usually such logic implies: Set -> Count = Size, Sum = Elements Sum.
                }
                
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
