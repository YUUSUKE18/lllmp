import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while ((int ch = br.read()) != -1) {
            String line = br.next();
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line.trim());
                if (memo.containsKey(n)) {
                    int steps = memo.get(n);
                } else {
                    int steps = 0;
                    if (n == 1) {
                        memo.put(1, 0);
                        steps = 0;
                    } else {
                        int current = n;
                        int steps = 0;
                        while (current != 1) {
                            if (current % 2 == 0) {
                                current = current / 2;
                            } else {
                                current = 3 * current + 1;
                            }
                            if (memo.containsKey(current)) {
                                steps = memo.get(current);
                            } else {
                                int next = current * 3 + 1;
                                if (next > 1000000000000) break;
                                steps = steps + 1;
                                memo.put(current, steps);
                            }
                            current = next;
                        }
                        memo.put(n, steps);
                        total += steps;
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
