import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int total = 0;
        Map<String, Integer> memo = new HashMap<>();
        while ((line = br.readLine()) != null && !line.isEmpty()) {
            String[] numbers = line.trim().split("\\s+");
            int n = Integer.parseInt(numbers[0]);
            int steps = 0;
            String key = n + "";
            if (memo.containsKey(key)) {
                steps = memo.get(key);
            } else {
                while (n != 1) {
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    steps++;
                }
                memo.put(key, steps);
            }
            total += steps;
        }
        System.out.println("total=" + total);
    }
}
