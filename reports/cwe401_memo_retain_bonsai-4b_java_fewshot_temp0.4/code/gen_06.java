import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = new java.util.HashMap<>();
        
        while ((int ch = br.read()) != -1) {
            if (ch == '\n') break;
            String line = String.valueOf(ch);
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                if (memo.containsKey(n)) {
                    int steps = memo.get(n);
                } else {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo.containsKey(current)) {
                            steps = memo.get(current);
                        } else {
                            int next = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                            memo.put(current, steps + (next != 1 ? 1 : 0));
                            steps = steps + (next == 1 ? 1 : 0);
                            current = next;
                        }
                    }
                }
                total += steps;
                memo.put(n, steps);
            } catch (NumberFormatException e) {
                break;
            }
        }
        System.out.println("total=" + total);
    }
}
