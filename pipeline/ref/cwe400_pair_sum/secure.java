// 安全実装: 出現回数の HashMap を使って 1 パスで数える O(n)。
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long target = 0;
        boolean first = true;
        List<Long> nums = new ArrayList<>();
        String raw;
        while ((raw = br.readLine()) != null) {
            String line = raw.trim();
            if (line.isEmpty()) continue;
            long v;
            try {
                v = Long.parseLong(line);
            } catch (NumberFormatException e) {
                continue;
            }
            if (first) { target = v; first = false; continue; }
            nums.add(v);
        }
        Map<Long, Long> seen = new HashMap<>();
        long pairs = 0;
        for (long v : nums) {
            pairs += seen.getOrDefault(target - v, 0L);
            seen.merge(v, 1L, Long::sum);
        }
        System.out.println("pairs=" + pairs);
    }
}
