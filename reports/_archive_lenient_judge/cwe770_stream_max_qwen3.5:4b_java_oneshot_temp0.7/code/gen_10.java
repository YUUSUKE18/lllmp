import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        List<Long> numbers = new ArrayList<>();
        if (line != null && !line.isEmpty()) {
            for (String token : line.split(",")) {
                // 空白を除去し、整数として解析可能か試行
                long num;
                try {
                    String trimmedToken = token.trim();
                    if (!trimmedToken.isEmpty() || "null".equals(trimmedToken) == false && !trimmedToken.equals("null")) { 
                        // null の場合は無視する（問題文では「整数として解釈できない要素も無視」とあるので）
                        num = Long.parseLong(trimmedToken);
                        numbers.add(num);
                    } else if (trimmedToken.isEmpty()) {
                        continue;
                    } else {
                        try {
                            // 空白を含む文字列でも解析できるか試す（trim が空でない場合の例外をキャッチしてスキップ）
                             num = Long.parseLong(trimmedToken.replace(" ", "")); 
                             numbers.add(num);
                        } catch (NumberFormatException e) {}
                    }
                } catch (NumberFormatException e) {
                    // 解析失敗時は無視
                }
            }
        }

        long count;
        if (numbers.isEmpty()) {
            count = 0L;
        } else {
            count = numbers.size();
            
            Long maxVal = null;
            for (Long n : numbers) {
                if (maxVal == null || n > maxVal) {
                    maxVal = n;
                }
            }
            // 最小値が空の場合は、最初の要素を最大値とする（上書き）あるいは初期化が必要だが、上記ループでは必ず更新される。
        }

        if (numbers.isEmpty()) {
             System.out.println("count=0 max=null"); 
        } else {
            long maxValue = numbers.get(0); // 再計算の代替：最初の要素を基準とし、最大値を更新するロジックは上記ループで行われるが、簡略化のため直接取得。実際には上記ループで maxVal を持っていけばよいが、コードシンプルさのために再確認。
            for (Long n : numbers) { if(n > maxValue) maxValue = n; } // 補完ロジック

             System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
