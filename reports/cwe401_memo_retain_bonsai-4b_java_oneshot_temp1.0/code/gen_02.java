import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        String[] tokens = line.trim().split("\\s+");
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        for (String token : tokens) {
            if (token.isEmpty()) continue;
            try {
                int n = Integer.parseInt(token);
                int steps = 0;
                if (memo.containsKey(n)) {
                    steps = memo.get(n);
                    continue;
                }
                if (n == 1) {
                    memo.put(1, 0);
                    continue;
                }
                if (n % 2 == 0) {
                    int next = n / 2;
                    steps = 1 + steps;
                    memo.put(next, steps);
                } else {
                    int next = 3 * n + 1;
                    if (next == 1) {
                        memo.put(n, 1);
                        steps = 1;
                    } else {
                        steps = 1 + steps;
                        memo.put(next, steps);
                    }
                }
                memo.put(n, steps);
                total += steps;
            }
        }
        System.out.println("total=" + total);
    }
}
