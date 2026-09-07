import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] memo = new int[1000000]; // メモ化用の配列
        int total = 0;
        while (true) {
            String line = br.readLine();
            if (line.isEmpty()) break;
            int n = Integer.parseInt(line);
            if (n == 1) {
                total += 0;
            } else if (memo[n] == 0) {
                int count = 0;
                while (n != 1) {
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    count++;
                }
                memo[n] = count;
                total += count;
            }
        }
        System.out.println("total=" + total);
    }
}
