import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int input = System.in.read();
            if (input == -1) break; // 空行は無視

            String line = new String(Character.toChars(input));
            String[] numbers = line.split("\\s+");

            for (String number : numbers) {
                int n = Integer.parseInt(number);
                if (n == 1) {
                    total += 0;
                    break;
                }
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    break;
                }
                int steps = 0;
                while (n != 1) {
                    steps++;
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    memo.put(n, steps);
                }
                total += steps;
            }
        }

        System.out.println("total=" + total);
    }
}
