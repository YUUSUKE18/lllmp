import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long[] memo = new long[100000001];
        long total = 0;
        while (true) {
            String line = br.readLine();
            if (line.isEmpty()) break;
            long n = Long.parseLong(line);
            if (n == 1) {
                total += 0;
            } else if (memo[n] != 0) {
                total += memo[n];
            } else {
                long count = 1;
                while (n != 1) {
                    memo[n] = count;
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    count++;
                }
                total += count;
            }
        }
        System.out.println("total=" + total);
    }
}
