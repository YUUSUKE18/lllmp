import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int memo = new java.util.HashMap<>();
        
        while ((int ch = br.read()) != -1) {
            String line = String.valueOf(ch);
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                int steps = 0;
                if (memo.containsKey(n)) {
                    steps = memo.get(n);
                } else {
                    while (n != 1) {
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        if (memo.containsKey(n)) {
                            steps = memo.get(n);
                        } else {
                            int next = n % 2 == 0 ? n / 2 : 3 * n + 1;
                            memo.put(next, steps + 1);
                            n = next;
                        }
                    }
                    memo.put(n, steps);
                }
                total += steps;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
