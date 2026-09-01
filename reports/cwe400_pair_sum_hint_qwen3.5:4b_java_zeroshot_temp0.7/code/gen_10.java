import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値を取得 (空行をスキップ)
        String targetLine = "";
        int linesRead = 0;
        while ((targetLine = br.readLine()) != null && !targetLine.trim().isEmpty()) {
            linesRead++;
            try {
                Long.parseLong(targetLine);
                break;
            } catch (NumberFormatException e) {
                // 数値でない行は無視して次のラインを読み取る
            }
        }
        
        if (targetLine == null || targetLine.isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine);
        Map<Long, Integer> map = new HashMap<>();
        long count = 0;

        while ((targetLine = br.readLine()) != null) {
            // 空行は無視
            if (targetLine.trim().isEmpty()) continue;
            
            try {
                Long val = Long.parseLong(targetLine);
                
                // 目標値 - 現在の値が存在するか検索
                long complement = target - val;
                Integer existingCount = map.get(complement);
                if (existingCount != null) {
                    count += existingCount;
                }
                
                // 現在の値をマップに追加
                int currentCount = map.getOrDefault(val, 0);
                map.put(val, currentCount + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
