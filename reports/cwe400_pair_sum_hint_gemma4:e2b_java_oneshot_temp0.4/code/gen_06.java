import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降の読み込み
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 2個の組の数を求める
        long pairCount = 0;
        int n = numbers.size();

        if (n >= 2) {
            // 2つの要素 a と b が a + b = target となるペアを探す
            // O(N^2) の総当たりで十分だが、より効率的に O(N) または O(N log N) を目指す
            // ここでは、リスト全体に対して O(N^2) の総当たりを試みる。
            // 制約が不明なため、N^2が許容されると仮定する。
            // もしNが非常に大きい場合、ハッシュマップを使うのがO(N)になる。
            
            // O(N^2) の総当たり (Nが最大数千程度なら許容)
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    long num1 = numbers.get(i);
                    long num2 = numbers.get(j);
                    if (num1 + num2 == target) {
                        pairCount++;
                    }
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + pairCount);
    }
}
