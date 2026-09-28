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
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            int steps = memo.getOrDefault(n, 0);
            total += steps + 1;
            memo.put(n, steps + 1);
        }
        System.out.println("total=" + total);
    }
}
