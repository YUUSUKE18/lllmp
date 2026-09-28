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
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                    continue;
                }
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                memo.put(n, count);
                total += count;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        System.out.println("total=" + total);
    }
}
