import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        String line;
        while ((line = br.readLine()) != null && !line.isEmpty()) {
            int n = Integer.parseInt(line.trim());
            if (n == 1) {
                total += 0;
            } else {
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        steps += memo.get(current);
                        break;
                    }
                    memo.put(current, steps);
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                total += steps;
            }
        }
        System.out.println("total=" + total);
    }
}
