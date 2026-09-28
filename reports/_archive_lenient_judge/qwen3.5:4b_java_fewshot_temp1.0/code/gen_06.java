import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;
// TreeSet automatically orders the elements, but we only need a Set for uniqueness. 
// Using HashSet is O(1) average insertion time and doesn't require ordering logic (which isn't needed here).

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        
        // Split by comma and process each token
        for (String token : line.split(",")) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) continue;
            
            try {
                int number = Integer.parseInt(trimmedToken);
                distinctNumbers.add(number);
                
                // Use BigInteger to ensure no overflow during summation, then cast back 
                // since the final result fits in 64-bit. However, summing ints directly into a long is safe if we use Long.parseLong or just keep track carefully.
                // Given "sum fits in 64bit", we can accumulate in a 'long'.
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = distinctNumbers.size();
        
        long sumVal = 0L; 
        for (int num : distinctNumbers) {
            // Check if adding this number would overflow before or after, though constraints say result fits.
            // Simple accumulation: since final fit in 64-bit and inputs are ints, we can use a primitive long loop.
            sumVal += num; 
        }

        System.out.println("count=" + count + " sum=" + sumVal);
    }
}
