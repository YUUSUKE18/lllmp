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

        Set<Integer> distinctNumbers = new HashSet<>();
        long totalSum = 0; // Using long to prevent overflow during accumulation, though problem says final result fits in 64-bit
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    int num = Integer.parseInt(part.trim());
                    distinctNumbers.add(num);
                    
                    // Since the problem guarantees the final sum fits in 64-bit integer, 
                    // we can accumulate safely. However, to be safe against intermediate overflows 
                    // if inputs are weirdly large but few (unlikely given constraints), long is safer than int for accumulation.
                    totalSum += num;
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します"
                }
            }
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=" + totalSum);
    }
}
