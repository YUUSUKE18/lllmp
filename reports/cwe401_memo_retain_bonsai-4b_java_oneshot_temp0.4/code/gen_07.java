import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("total=0");
            return;
        }
        String[] parts = line.trim().split("\\s+");
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        for (String f : parts) {
            if (f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                int steps = 0;
                if (n == 1) {
                    steps = 0;
                } else {
                    while (n != 1) {
                        if (memo.containsKey(n)) {
                            steps = memo.get(n);
                            break;
                        }
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                }
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }
}
