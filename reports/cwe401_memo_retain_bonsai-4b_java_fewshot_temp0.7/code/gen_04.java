import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while ((int ch = br.read()) != -1) {
            String line = new String(ch);
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (memo.containsKey(n)) {
                    int result = memo.get(n);
                } else {
                    int result = 0;
                    int current = n;
                    int steps = 0;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (current > 1000000000) break;
                        if (memo.containsKey(current)) {
                            current = memo.get(current);
                        } else {
                            current = 3 * current + 1;
                            int steps = 0;
                            while (current != 1) {
                                if (current % 2 == 0) {
                                    current = current / 2;
                                } else {
                                    current = 3 * current + 1;
                                }
                                steps++;
                            }
                            memo.put(current, steps);
                        }
                    }
                    memo.put(n, steps);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
