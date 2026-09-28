import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        long count = 0;
        boolean first = true;
        long maxValue = Long.MIN_VALUE; // 初期値を最小値に設定（空の場合の処理も考慮）

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long value = Long.parseLong(token);
                
                if (!first) {
                    maxValue = Math.max(maxValue, value);
                } else {
                    // 最初の要素は常に最大値候補として扱うが、空のリストの場合は count=0 で出力する必要があるため
                    // ここでは first=true の場合も比較対象とみなす（ただし初期化時に最小値に設定済み）
                    maxValue = Math.max(maxValue, value); 
                }
                
                if (first) {
                    maxValue = value;
                } else {
                     maxValue = Math.max(maxValue, value);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する（この例では token が文字列なので、解析失敗は rare）
            } finally {
                count++;
            }
        }
        
        System.out.println("count=" + count + " max=" + maxValue);
    }
}
