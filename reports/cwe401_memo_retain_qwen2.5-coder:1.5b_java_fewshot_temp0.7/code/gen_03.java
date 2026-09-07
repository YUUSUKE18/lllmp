import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        while (sc.hasNextInt()) {
            int n = sc.nextInt();
            if (n == 1) {
                total += 0;
            } else if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int steps = 0;
                int current = n;
                while (current != 1) {
                    steps++;
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                }
                total += steps;
                memo.put(n, steps);
            }
        }
        System.out.println("total=" + total);
    }
}
