import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static int[] memo = new int[1000000000];
    private static int[] memo2 = new int[1000000000];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        while ((br.readLine() != null)) {
            int n = Integer.parseInt(br.readLine());
            if (n == 1) {
                total += 0;
            } else if (n % 2 == 0) {
                total += memo[n / 2];
            } else {
                total += memo2[3 * n + 1];
            }
        }
        System.out.println("total=" + total);
    }
}
