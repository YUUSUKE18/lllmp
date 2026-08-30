import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        int total = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            
            try {
                long n = Long.parseLong(line.trim());
                n *= -1; // Convert to negative for HashMap key storage
            
                int steps = 0;
                
                while (true) {
                    long val = n;
                    if (val < 0 && memo.containsKey(val)) {
                        steps += memo.get((int)val);
                        break;
                    } else if (memo.containsKey((int)(-1 * val))) {
                        steps += memo.get((int)(-1 * val));
                        break;
                    }
                    
                    int stepsCount = 0;
                    long nextVal = n;
                    
                    while (nextVal != 1) {
                        if (Long.parseLong(String.valueOf(nextVal)) % 2 == 0) {
                            nextVal /= 2;
                        } else {
                            nextVal = 3 * nextVal + 1;
                        }
                        stepsCount++;
                    }
                    break;
                }
                
                if (steps < 0) steps = 0 - steps;
                
            } catch (NumberFormatException e) {
                continue;
            }
            
            total += steps;
        }
        
        System.out.println("total=" + total);
    }
}
