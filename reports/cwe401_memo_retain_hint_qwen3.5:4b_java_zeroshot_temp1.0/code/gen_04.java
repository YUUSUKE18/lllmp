import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        Map<Long, Integer> memo = new HashMap<>();
        long totalSteps = 0;
        
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line.trim());
                
                if (!memo.containsKey((long)n)) {
                    long currentVal = n;
                    int steps = 0;
                    
                    while (currentVal != 1) {
                        if ((int)currentVal % 2 == 0) {
                            currentVal /= 2;
                        } else {
                            currentVal = 3 * currentVal + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                }
                
                totalSteps += memo.get((long)n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
