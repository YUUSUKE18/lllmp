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
        long maxValue = Long.MIN_VALUE; // 初期値を最小整数に設定（空の場合の処理と整合させるため）

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token);
                
                if (!first) {
                    maxValue = Math.max(maxValue, val);
                } else {
                    // 最初の要素のみを初期最大値として設定（空リストの場合は MIN_VALUE が出力される）
                    maxValue = val; 
                }
                
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }

            first = false;
        }

        if (!first && Long.MIN_VALUE == maxValue) {
             // 最初の要素が MIN_VALUE の場合、実際の最大値は更新されているはずだが、
             // ここでは count > 0 で初めて max を設定するロジックを修正。
             // より安全な初期化: 最初に見つかった有効な整数のみで max を決定。
        }

        System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : maxValue));
    }
}
