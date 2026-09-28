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
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=0");
                    continue;
                }
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        count += memo.get(current);
                        break;
                    }
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                    memo.put(current, count);
                }
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                } else {
                    memo.put(n, count);
                    total += count;
                }
            } catch (NumberFormatException e) {
                // Ignore lines with invalid integers
            }
        }
        System.out.println("total=" + total);
    }
}
