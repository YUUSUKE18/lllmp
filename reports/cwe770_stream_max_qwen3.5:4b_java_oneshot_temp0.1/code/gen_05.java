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
        long maxVal = Long.MIN_VALUE; // 初期値を最小値に設定（空の場合の処理も考慮）

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token);
                
                if (!first) {
                    maxVal = Math.max(maxVal, val);
                } else {
                    // 最初の要素のみで初期化（負の値を含む場合に対応）
                    maxVal = val; 
                }
                
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }

            first = false;
        }

        if (!first && Long.MIN_VALUE == maxVal) {
             System.out.println("count=" + count + " max=0");
        } else if (!first) {
            System.out.println("count=" + count + " max=" + maxVal);
        } else {
            // 要素が一つもない場合の処理（仕様上、空列の場合）
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

    }
}
