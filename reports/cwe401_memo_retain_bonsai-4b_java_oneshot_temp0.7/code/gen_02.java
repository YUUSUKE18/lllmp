import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.Map<Integer, Integer> memo = java.util.HashMap<>();
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue;
            
            String[] tokens = trimmed.split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(token);
                    if (memo.containsKey(n)) continue;
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                    total += steps;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
