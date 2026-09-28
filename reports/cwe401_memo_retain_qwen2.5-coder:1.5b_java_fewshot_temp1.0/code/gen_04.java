import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        boolean[] memo = new boolean[1000001]; // 利用しない数字は true
        int total = 0;
        int c = 0;
        while ((c = br.read()) != -1 && c != '\n') { // 先に空白や改行を取り除く
            String n = br.readLine();
            if (n == null || n.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(n);
                if (memo[num]) continue; // 既に計算済みなら無視
                int cnt = 0;
                while (num != 1) {
                    memo[num] = true; // メモ化
                    if (num % 2 == 0) num /= 2; else num = 3 * num + 1;
                    cnt++;
                }
                total += cnt;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("total=" + total);
    }
}
