import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                memo.put(n, calculateStep(n, memo));
                total += memo.get(n);
            } catch (NumberFormatException e) {
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateStep(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }
        
        int steps = 1 + calculateStep(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
