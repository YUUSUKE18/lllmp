import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int count = 0, total = 0;
        HashMap<Integer, Integer> memo = new HashMap<>();
        while ((count = br.readLine()) != null && count != "0") {
            int n = Integer.parseInt(count);
            if (n == 1) {
                total += 0;
            } else if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int res = n % 2 == 0 ? n / 2 : 3 * n + 1;
                total += res;
                memo.put(n, res);
            }
        }
        System.out.println("total=" + total);
    }
}
