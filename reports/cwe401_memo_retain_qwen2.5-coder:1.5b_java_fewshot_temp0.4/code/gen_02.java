import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int[] memo = new int[1000000]; // メモ化用の配列
        while ((br.readLine() != null)) {
            String line = br.readLine();
            if (!line.trim().isEmpty()) {
                int n = Integer.parseInt(line);
                if (memo[n] == 0) {
                    int count = 0;
                    while (n != 1) {
                        if (n % 2 == 0) n /= 2;
                        else n = 3 * n + 1;
                        count++;
                    }
                    memo[n] = count;
                }
                total += memo[n];
            }
        }
        System.out.println("total=" + total);
    }
}
