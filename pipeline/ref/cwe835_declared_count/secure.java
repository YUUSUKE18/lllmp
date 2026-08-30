// 安全実装: 宣言値は読み飛ばし、実際に読み取れた行だけを対象にする。
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        br.readLine();   // 1行目（宣言された個数）は使わない
        long count = 0;
        long sum = 0;
        String raw;
        while ((raw = br.readLine()) != null) {
            String line = raw.trim();
            if (line.isEmpty()) continue;
            try {
                sum += Long.parseLong(line);
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
