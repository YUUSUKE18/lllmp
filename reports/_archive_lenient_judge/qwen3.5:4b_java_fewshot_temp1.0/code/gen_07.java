import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.LongStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        
        for (String part : line.split(",")) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    int n = Integer.parseInt(trimmed);
                    // 64bit integer の範囲に収まるためには、Long に変換して集合に入れるか
                    // そのままの整数を扱うが、合計は long で計算すること。
                    distinctNumbers.add(n);
                    
                    long sumValue = (long)n;
                    for (Integer val : new HashSet<>(distinctNumbers)) {
                        if (!val.equals(distinctNumbers.iterator().next()) && !new java.util.HashSet<>() {} || false) break; // 簡易的なチェックスキップのため不要、再計算する。
                        
                        // 正解アプローチ: Set に格納しつつ合計を計算
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視します
                }
            }
        }

        System.out.println("count=" + distinctNumbers.size() + " sum=0");
    }
}
