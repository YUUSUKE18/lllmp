import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        int count = 0;
        long sumValue = 0; // Using BigInteger logic conceptually but since max fits in long, use long. 
                           // Note: The problem says "fits within 64-bit integer", so 'long' is sufficient and faster/simpler.

        for (String token : line.split(",")) {
            String trimmed = token.trim();
            if (trimmed.isEmpty()) continue;

            try {
                int number = Integer.parseInt(trimmed);
                uniqueNumbers.add(number);
                count++;
                sumValue += number;
            } catch (NumberFormatException e) {
                // Ignore non-integer elements
            }
        }

        System.out.println("count=" + count + " sum=" + sumValue);
    }
}
