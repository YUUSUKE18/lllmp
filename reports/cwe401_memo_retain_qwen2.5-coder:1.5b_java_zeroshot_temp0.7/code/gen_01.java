import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            String query = reader.readLine();
            if (query == null || query.trim().isEmpty()) {
                break;
            }
            int n = Integer.parseInt(query);
            if (n == 1) {
                total += 0;
                break;
            }
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
            }
            total += steps;
            memo.put(n, steps);
        }

        System.out.println("total=" + total);
    }
}
