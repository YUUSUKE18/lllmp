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
        long sum = 0L; // Using long to prevent overflow during accumulation, though problem guarantees final result fits in 64-bit integer.

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    int num = Integer.parseInt(part.trim());
                    distinctNumbers.add(num); // Add to set automatically handles uniqueness
                    
                    count++;
                    sum += num;
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します"
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
