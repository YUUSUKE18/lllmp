import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            String[] tokens = line.trim().split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(token);
                    if (memo.containsKey(n)) continue;
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo.containsKey(current)) break;
                        memo.put(current, steps + 1);
                        steps++;
                    }
                    if (memo.containsKey(1)) {
                        memo.put(1, 0);
                    }
                    total += steps;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
