import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                long current = n;
                int steps = 0;
                
                while (current != 1) {
                    if (!memo.containsKey(current)) {
                        long nextVal;
                        if (current % 2 == 0) {
                            nextVal = current / 2;
                        } else {
                            nextVal = 3L * current + 1;
                        }
                        memo.put(current, steps);
                        steps++;
                        current = nextVal;
                    } else {
                        steps += memo.get((int)current);
                        break;
                    }
                }
                
                // If we reached 1 through memoization, add the stored value for the final 1
                if (memo.containsKey(1)) {
                    total += memo.get(1);
                } else {
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
