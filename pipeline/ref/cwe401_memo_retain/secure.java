// 安全実装: メモ化はクエリされた値だけに限る。
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    static final Map<Long, Long> memo = new HashMap<>();

    static long steps(long n) {
        Long hit = memo.get(n);
        if (hit != null) return hit;
        long cur = n;
        long c = 0;
        while (cur != 1) {
            cur = (cur % 2 == 0) ? cur / 2 : 3 * cur + 1;
            c++;
        }
        memo.put(n, c);
        return c;
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        String raw;
        while ((raw = br.readLine()) != null) {
            String line = raw.trim();
            if (line.isEmpty()) continue;
            try {
                long n = Long.parseLong(line);
                if (n < 1) continue;
                total += steps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        System.out.println("total=" + total);
    }
}
