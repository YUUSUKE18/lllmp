import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();
        while ((line = br.readLine()) != null) {
            if (!line.isEmpty()) {
                int n = Integer.parseInt(line.trim());
                if (n == 1) {
                    total += 0;
                } else if (memo.containsKey(n)) {
                    total += memo.get(n);
                } else {
                    int steps = 0;
                    while (n != 1) {
                        steps++;
                        memo.put(n, steps);
                        n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
                    }
                    total += steps + memo.get(n);
                }
            }
        }
        System.out.println("total=" + total);
    }
}
