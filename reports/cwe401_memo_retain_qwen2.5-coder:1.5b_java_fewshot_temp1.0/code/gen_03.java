import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        Map<Integer, Integer> memo = new HashMap<>();
        boolean first = true;
        while ((br.readLine() != null) && first) {
            int n = 1;
            while (n != 1) {
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    first = false;
                    break;
                }
                memo.put(n, 0);
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                total++;
            }
            if (first) {
                total = 0;
                first = false;
            }
        }
        System.out.println("total=" + total);
    }
}
