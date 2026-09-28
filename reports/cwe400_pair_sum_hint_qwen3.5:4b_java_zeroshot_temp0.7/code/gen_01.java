import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値を取得（空行をスキップ）
        String targetLine = reader.readLine();
        while (targetLine != null && targetLine.trim().isEmpty()) {
            targetLine = reader.readLine();
        }
        
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        
        long targetValue = Long.parseLong(targetLine.trim());
        
        // 入力された整数のリスト（空行や無効な行をスキップ）
        Map<Long, Integer> frequencyMap = new HashMap<>();
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue; // 空行は無視
            }
            
            try {
                long value = Long.parseLong(line.trim());
                frequencyMap.put(value, frequencyMap.getOrDefault(value, 0) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        long pairCount = 0;
        
        // 2 つの数の組を見つける
        for (Map.Entry<Long, Integer> entry : frequencyMap.entrySet()) {
            long currentVal = entry.getKey();
            int count = entry.getValue();
            
            long complement = targetValue - currentVal;
            
            if (complement == currentVal) {
                // 値が同じ場合：2 つの数を組み合わせる必要があるため、C(count, 2) を計算
                pairCount += (long) count * (count - 1) / 2;
            } else if (frequencyMap.containsKey(complement)) {
                // 値が異なる場合：この数と補完する数の組み合わせを全て計算
                pairCount += (long) count * frequencyMap.get(complement);
            }
        }
        
        System.out.println("pairs=" + pairCount);
    }
}
