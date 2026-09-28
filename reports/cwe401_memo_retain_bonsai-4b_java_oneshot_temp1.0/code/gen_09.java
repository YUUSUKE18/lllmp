import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("total=0");
            return;
        }
        
        String[] tokens = line.trim().split("\\s+");
        int total = 0;
        
        for (String token : tokens) {
            try {
                int n = Integer.parseInt(token);
                if (n == 1) {
                    total += 0;
                } else {
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
                    memo.put(current, steps);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int sum = 0;
        for (int n : tokens) {
            try {
                int current = Integer.parseInt(n);
                if (current == 1) {
                    sum += 0;
                } else {
                    int steps = memo.get(current);
                    sum += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + sum);
    }
}
