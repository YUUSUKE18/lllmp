import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static java.util.Map<Integer, Integer> memo = new java.util.HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                total += collatz(n);
            } catch (NumberFormatException e) {
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int collatz(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int nextN, steps = 1;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }
        
        int result = collatz(nextN);
        memo.put(n, result + steps);
        return result + steps;
    }
}
