import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        int currentMax = 1000000000; // Initialize with a value larger than any possible integer input to handle first element correctly, or use Long.MAX_VALUE if we were summing directly, but here we just check for first.
        // Actually, for the max logic used in previous examples, let's stick to the logic: initialize max to Integer.MIN_VALUE and handle the first assignment separately or simply track if it's the first valid number.
        
        // Re-evaluating initialization: We need the sum of unique integers.
        // We can use Long for the sum to be safe, though the problem says it fits in 64-bit.
        long sum = 0;
        int count = 0;
        boolean first = true;

        String[] parts = line.split(",");
        
        for (String part : parts) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    int num = Integer.parseInt(trimmed);
                    distinctNumbers.add(num);
                    
                    // Check if this is the first valid number found to set initial sum/max logic correctly
                    if (first) {
                        sum += num;
                        count++;
                        first = false;
                    } else {
                        sum += num;
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer elements
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
