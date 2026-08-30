import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctIntegers = new HashSet<>();
        String[] parts = line.split(",");
        long totalCountSum = 0L; // Use long to prevent overflow during accumulation if needed, though problem says result fits in 64-bit
        
        for (String part : parts) {
            int trimmedPartIndex = -1;
            
            try {
                String numStr = part.trim();
                int n = Integer.parseInt(numStr);
                
                // Check if the integer is already seen to count unique ones only once? 
                // Wait, re-reading: "重複を除いた整数について、個数と合計を求めます"
                // This means we are considering a set of UNIQUE integers. For each such unique number, we want its frequency and sum?
                // Or does it mean the total count of unique numbers and their combined sum?
                
                // Let's re-read carefully: "重複を除いた整数について、個数と合計を求めます" (For the integers with duplicates removed [i.e., unique ones], find the count and sum).
                // Usually, this phrasing in competitive programming context implies: 
                // Given a list like 1,2,3,2 -> Unique are {1,2,3}. Count = 3. Sum of these unique numbers? Or Sum of all elements divided by something?
                
                // Actually, the most logical interpretation for "count and sum" based on "integers with duplicates removed":
                // It likely means: How many UNIQUE integers exist (Count)? And what is the SUM of those UNIQUE integers? 
                // Example: Input 1,2,3,2 -> Unique {1,2,3}. Count=3. Sum=6.
                
                distinctIntegers.add(n);
            } catch (NumberFormatException e) {
                continue; // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
            }
        }

        int count = distinctIntegers.size();
        
        long sum = 0L;
        for (int n : distinctIntegers) {
            sum += n;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
