import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder totalBuilder = new StringBuilder();
        
        // Memoization map: stores the calculated steps for previously encountered numbers
        Map<Long, Long> memo = new HashMap<>();
        long totalSum = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                
                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    long steps = 0;
                    totalSum += steps;
                    // Memoize for 1
                    memo.put(n, steps);
                } else if (!memo.containsKey(n)) {
                    // Recursive calculation with memoization
                    long steps = 0;
                    long current = n;
                    int count = 0;
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    steps = count;
                    totalSum += steps;
                    memo.put(n, steps);
                } else {
                    // Retrieve memoized result
                    steps = memo.get(n);
                    totalSum += steps;
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        totalBuilder.append("total=").append(totalSum).append("\n");
        System.out.print(totalBuilder.toString());
    }
}
