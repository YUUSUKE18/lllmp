import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        boolean first = true;
        if (br.readLine() != null) {
            for (String f : br.readLine().trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first || n > max) { max = n; first = false; }
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                        continue;
                    }
                    int steps = 0;
                    while (n != 1) {
                        steps++;
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        if (memo.containsKey(n)) {
                            steps += memo.get(n);
                            break;
                        }
                        memo.put(n, steps);
                    }
                    total += steps;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
