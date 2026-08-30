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
        long totalSum = 0L; // Using long to prevent overflow during accumulation, though problem guarantees final result fits in 64-bit integer.

        String[] parts = line.trim().split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part);
                distinctNumbers.add(num); // Add to set automatically handles uniqueness
                
                count++;
                totalSum += num;
            } catch (NumberFormatException e) {
                // Ignore non-integer elements as per spec
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
