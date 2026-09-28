import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        import java.util.HashMap;
        import java.util.Map;

        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        while ((line = br.readLine()) != null) {
            String[] nums = line.trim().split("\\s+");
            for (String num : nums) {
                if (num.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(num);
                    if (n == 1) {
                        total += 0;
                        continue;
                    }
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                        continue;
                    }
                    int steps = 1;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps += 1;
                    }
                    memo.put(n, steps);
                    total += steps;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
