import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            for (String part : line.trim().split("\\s+")) {
                if (part.isEmpty()) continue;
                try {
                    long n = Long.parseLong(part);
                    int steps = 0;
                    
                    while (n > 1) {
                        int nextN;
                        if (n % 2 == 0) {
                            nextN = n / 2;
                        } else {
                            nextN = 3 * n + 1;
                        }
                        
                        if (memo.containsKey(nextN)) {
                            steps += memo.get(nextN);
                            break;
                        }
                        memo.put(nextN, -1); // Mark as visiting to avoid infinite loops in theory, though Collatz conjecture holds
                        n = nextN;
                        steps++;
                    }
                    
                    if (!memo.containsKey(n)) {
                        steps += 0; // Already at 1 or handled above
                    } else {
                        steps += memo.get(n); // Add remaining steps from memo
                    }
                    
                    total += steps;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        System.out.println("total=" + total);
    }
}
