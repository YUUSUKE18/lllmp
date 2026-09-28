import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目に目標値を読む（空行はスキップ）
        String targetLine = "";
        int count = 0;
        while (!targetLine.isEmpty()) {
            targetLine = reader.readLine();
            if (targetLine == null) break;
            targetLine = targetLine.trim();
            if (targetLine.length() > 0) {
                count++;
                break;
            }
        }
        
        if (count == 0) return; // 入力なしの場合
        
        long targetValue = Long.parseLong(targetLine);

        Map<Long, Integer> frequencyMap = new HashMap<>();
        int resultCount = 0;

        // 2 行目以降を読み込み、処理する（空行や無効な整数はスキップ）
        while (true) {
            String line = reader.readLine();
            if (line == null) break;

            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) continue; // 空行は無視

            try {
                long value = Long.parseLong(trimmedLine);
                
                // 目標値 - 現在の値が見つかるかチェック
                long complement = targetValue - value;
                if (frequencyMap.containsKey(complement)) {
                    resultCount += frequencyMap.get(complement);
                }
                
                // 現在の値をマップに追加（重複考慮するため）
                int countInMap = frequencyMap.getOrDefault(value, 0);
                frequencyMap.put(value, countInMap + 1);
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("pairs=" + resultCount);
    }
}
