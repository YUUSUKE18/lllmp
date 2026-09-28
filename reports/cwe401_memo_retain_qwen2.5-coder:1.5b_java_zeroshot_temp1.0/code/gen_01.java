import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();
        
        while (scanner.hasNextInt()) {
            int n = scanner.nextInt();
            if (n == 1) {
                break;
            }
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }
            int steps = 0;
            while (n != 1) {
                memo.put(n, steps);
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                steps++;
            }
            total += steps;
        }
        
        System.out.println("total=" + total);
    }
}
