// 素朴実装: 経路上のすべての中間値をメモ化する（CWE-401: 保持し続けて解放しない）。
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    static final Map<Long, Long> memo = new HashMap<>();

    static long steps(long n) {
        List<Long> path = new ArrayList<>();
        long cur = n;
        long extra = 0;
        while (cur != 1) {
            Long hit = memo.get(cur);
            if (hit != null) { extra = hit; break; }
            path.add(cur);
            cur = (cur % 2 == 0) ? cur / 2 : 3 * cur + 1;
        }
        for (int i = path.size() - 1; i >= 0; i--) {
            extra++;
            memo.put(path.get(i), extra);   // 中間値をすべて覚える
        }
        return extra;
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
