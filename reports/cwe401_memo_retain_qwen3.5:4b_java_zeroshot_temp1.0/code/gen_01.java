import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line);
                if (n <= 0) continue; // 1 以上という仕様だが、防御のため
                
                int steps = calculateSteps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long nextN;
        int steps = 1;
        
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }
        
        steps += calculateSteps(nextN);
        memo.put(n, steps);
        
        return steps;
    }
}
