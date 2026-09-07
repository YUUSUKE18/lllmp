import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int input = System.in.read();
            if (input == '\n') break;

            int number = input - '0';
            if (memo.containsKey(number)) {
                total += memo.get(number);
                continue;
            }

            int steps = 0;
            while (number != 1) {
                steps++;
                if (number % 2 == 0) {
                    number /= 2;
                } else {
                    number = 3 * number + 1;
                }
            }

            total += steps;
            memo.put(number, steps);
        }

        System.out.println("total=" + total);
    }
}
