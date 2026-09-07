import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[1000001];
        int total = 0;
        while ((br.readLine() != null)) {
            int n = Integer.parseInt(br.readLine());
            if (n == 1) {
                total += 0;
            } else if (memo[n] != 0) {
                total += memo[n];
            } else {
                int count = 0;
                while (n != 1) {
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    count++;
                }
                total += count;
                memo[n] = count;
            }
        }
        System.out.println("total=" + total);
    }
}
