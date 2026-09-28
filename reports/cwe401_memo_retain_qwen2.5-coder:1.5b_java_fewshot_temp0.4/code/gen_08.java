import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long[] memo = new long[1000001];
        long total = 0;
        while ((line = br.readLine()) != null) {
            long n = Long.parseLong(line.trim());
            if (n == 1) {
                total += 0;
            } else if (n % 2 == 0) {
                total += memo[n / 2];
            } else {
                total += memo[3 * n + 1];
            }
            memo[n] = total;
        }
        System.out.println("total=" + total);
    }
}
