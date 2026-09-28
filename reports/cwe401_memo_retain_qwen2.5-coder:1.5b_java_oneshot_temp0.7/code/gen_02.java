import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        HashMap<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        int n;
        while ((n = Integer.parseInt(br.readLine())) != 0) {
            total += f(n, memo);
        }
        System.out.println("total=" + total);
    }

    private static int f(int n, HashMap<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int result;
        if (n % 2 == 0) {
            result = 1 + f(n / 2, memo);
        } else {
            result = 1 + f(3 * n + 1, memo);
        }
        memo.put(n, result);
        return result;
    }
}
