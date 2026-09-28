import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目に目標値が与えられます
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());

        // Map を用いて出現回数をカウントし、ペアを見つける
        Map<Long, Integer> countMap = new HashMap<>();
        long pairs = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視し、整数として解釈できない行も無視します
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(line);
                long needed = target - val;
                
                // 必要な数があるかチェック
                Integer existing = countMap.get(needed);
                if (existing != null) {
                    pairs += existing;
                }
                
                // 現在の数をカウントアップ
                int currentCount = countMap.getOrDefault(val, 0);
                countMap.put(val, currentCount + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
