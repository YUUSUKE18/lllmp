import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("0");
            return;
        }
        
        String[] tokens = line.trim().split("\\s+");
        int total = 0;
        
        for (String token : tokens) {
            try {
                int n = Integer.parseInt(token);
                if (n <= 0) continue;
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                    } else {
                        memo.put(current, 1 + steps);
                        steps = memo.get(current);
                    }
                }
                memo.put(1, 0);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
