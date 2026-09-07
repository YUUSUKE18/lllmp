import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        int[] memo = new int[10000001]; // 64bit 整数の最大値を10000000で管理する

        while (true) {
            String line = br.readLine();
            if (line.isEmpty() || line.trim().equals("end")) break;
            int n = 0;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    n = Integer.parseInt(f);
                    if (n <= 0) continue;
                    if (memo[n] == 0) {
                        int count = 0;
                        while (n != 1) {
                            memo[n] = count;
                            if (n % 2 == 0) n /= 2;
                            else n = 3 * n + 1;
                            count++;
                        }
                        total += count;
                    }
                    total += memo[n];
                } catch (NumberFormatException e) {
                }
            }
            System.out.println("total=" + total);
            total = 0; // メモリクリア
        }
    }
}
