import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        String line;
        while ((line = br.readLine()) != null) {
            int n = 0;
            for (String s : line.split("\\s+")) {
                if (s.isEmpty() || !s.matches("-?[0-9]+")) continue;
                n = Integer.parseInt(s);
                if (n == 1) continue;
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }
                int count = 0;
                while (n != 1) {
                    if (n % 2 == 0) {
                        n /= 2;
                        count++;
                    } else {
                        n = 3 * n + 1;
                        count++;
                    }
                }
                memo.put(n, count);
                total += count;
            }
        }
        System.out.println("total=" + total);
    }
}
