import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        for (int i = 1; i <= 100000; i++) {
            int n = i;
            int count = 0;

            while (n != 1) {
                if (memo.containsKey(n)) {
                    count += memo.get(n);
                    break;
                }
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                count++;
            }

            if (n == 1) {
                total += count;
            }

            memo.put(i, count);
        }

        System.out.println("total=" + total);
    }
}
