import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目に目標値が与えられます
        String line = br.readLine();
        if (line == null) return;
        line = line.trim();
        if (line.isEmpty()) return;
        
        long target;
        try {
            target = Long.parseLong(line);
        } catch (NumberFormatException e) {
            // 目標値が整数でない場合は処理を終了
            return;
        }

        Map<Long, Long> map = new HashMap<>();
        long count = 0;

        // 2 行目以降を読み込む
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long num = Long.parseLong(line);
                long needed = target - num;
                
                // 足して目標値になる数があるか確認
                Long freq = map.get(needed);
                if (freq != null) {
                    count += freq;
                }
                
                // 現在の数をマップに追加
                map.put(num, map.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("pairs=" + count);
    }
}
