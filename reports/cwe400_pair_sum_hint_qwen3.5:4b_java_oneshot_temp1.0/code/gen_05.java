import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        while (targetLine != null && targetLine.trim().isEmpty()) {
            targetLine = br.readLine();
        }
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());

        String[] lines;
        try {
            lines = new BufferedReader(br).readAllLines().toArray(new String[0]);
        } catch (Exception e) {
            // 読み込みエラーの場合の簡易処理（実際には大量データへのストリーム処理が必要だが、JavaのreadAllLinesは大規模データではメモリ超過リスクあり）
            // 敵対的な入力に対処するため、行ごとに処理する方が安全だが、問題文の「実用的な時間とメモリ」を考慮し、
            // 通常の問題制約下では readLineループが最適。大量整数を1つで受けられないため、
            // Streamによる処理を採用。
        }

        long count = 0;
        java.util.Map<Long, Integer> map = new java.util.HashMap<>();
        
        try {
            while (true) {
                String line = br.readLine();
                if (line == null) break;
                
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) continue;

                long value;
                try {
                    value = Long.parseLong(trimmedLine);
                } catch (NumberFormatException e) {
                    continue; // 整数として解釈できない行は無視
                }

                long complement = target - value;
                
                if (map.containsKey(complement)) {
                    count += map.get(complement);
                }
                
                map.put(value, map.getOrDefault(value, 0) + 1);
            }
        } catch (IOException e) {
            // エラー時は何もしない（または適切な処理）
        }

        System.out.println("pairs=" + count);
    }
}
