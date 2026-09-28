import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final java.util.Map<Integer, Integer> memo = new java.util.HashMap<>();
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("total=0");
            return;
        }
        
        for (String f : line.trim().split("\\s+")) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (memo.containsKey(n)) {
                    int result = memo.get(n);
                } else {
                    int result = compute(n);
                    memo.put(n, result);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int total = 0;
        for (String f : line.trim().split("\\s+")) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (memo.containsKey(n)) {
                    int result = memo.get(n);
                } else {
                    int result = compute(n);
                    memo.put(n, result);
                }
                total += result;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int compute(int n) {
        if (n == 1) return 0;
        int steps = 0;
        int current = n;
        
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        return steps;
    }
}
