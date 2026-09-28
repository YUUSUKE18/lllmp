import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null) {
            return;
        }
        
        long target;
        try {
            // 1 行目に目標値が与えられます。空白を除いて整数として解析。
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            // 目標値の解釈エラー（仕様上は発生しないため）
            return;
        }

        Map<Long, Long> map = new HashMap<>();
        long pairs = 0;

        while ((line = br.readLine()) != null) {
            String content = line.trim();
            
            // 空行は無視
            if (content.isEmpty()) {
                continue;
            }

            try {
                // 整数として解釈できない行も無視します。
                long num = Long.parseLong(content);
                long complement = target - num;
                
                // 補完値がマップにある場合、その出現回数を足す
                if (map.containsKey(complement)) {
                    pairs += map.get(complement);
                }
                
                // 現在の数値の出現回数をインクリメント
                long currentCount = map.getOrDefault(num, 0L);
                map.put(num, currentCount + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視します
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
