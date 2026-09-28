import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        HashMap<Long, Integer> memo = new HashMap<>();
        int total = 0;
        long num;
        while ((num = Long.parseLong(br.readLine())) != 0) {
            if (memo.containsKey(num)) {
                System.out.println("total=" + (memo.get(num) + total));
            } else {
                int steps = 0;
                long current = num;
                while (current != 1) {
                    memo.put(current, steps);
                    steps++;
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                }
                memo.put(num, steps);
                total += steps;
            }
        }
    }
}
