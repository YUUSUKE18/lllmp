import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();
        while ((br.ready() && !br.readLine().isEmpty())) {
            int n = Integer.parseInt(br.readLine());
            if (n == 1) {
                total += 0;
            } else if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int steps = 0;
                while (n != 1) {
                    steps++;
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                }
                memo.put(n, steps);
                total += steps;
            }
        }
        System.out.println("total=" + total);
    }
}
