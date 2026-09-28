import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値を読み取る（空行をスキップ）
        String targetLine = null;
        while (targetLine == null || targetLine.trim().isEmpty()) {
            targetLine = reader.readLine();
        }
        long target = Long.parseLong(targetLine.trim());
        
        Map<Long, Integer> frequencyMap = new HashMap<>();
        long count = 0;
        long sumFoundSoFar = 0;
        
        // 整数を読みながら処理する（空行をスキップ）
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long value = Long.parseLong(line.trim());
                
                // すでに存在する値と合わせると目標值になるか確認
                long needed = target - value;
                if (frequencyMap.containsKey(needed)) {
                    count += frequencyMap.get(needed);
                }
                
                // 現在の値の周回数を記録
                frequencyMap.put(value, frequencyMap.getOrDefault(value, 0) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視（仕様通り）
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
