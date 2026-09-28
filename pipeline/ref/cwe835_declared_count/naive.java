// 素朴実装: 宣言された個数だけ readLine を呼ぶ。null(EOF) を無視して回り続ける（CWE-835）。
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n;
        try {
            n = Long.parseLong(br.readLine().trim());
        } catch (Exception e) {
            n = 0;
        }
        long count = 0;
        long sum = 0;
        for (long i = 0; i < n; i++) {
            String raw = br.readLine();
            if (raw == null) continue;   // EOF でも打ち切らない
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
