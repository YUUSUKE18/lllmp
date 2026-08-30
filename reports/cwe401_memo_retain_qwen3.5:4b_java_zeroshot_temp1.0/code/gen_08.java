import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.StringTokenizer;

public class Main {
    private static final HashMap<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n);
                System.out.println("total=" + steps);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
    }

    private static int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }
        
        int steps = 1 + calculateSteps(nextN);
        memo.put(n, steps);
        return steps;
    }
}
