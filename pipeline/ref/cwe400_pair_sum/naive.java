// 素朴実装: 全ペアを二重ループで走査する O(n^2)（CWE-400）。
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

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
        long pairs = 0;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums.get(i) + nums.get(j) == target) pairs++;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
