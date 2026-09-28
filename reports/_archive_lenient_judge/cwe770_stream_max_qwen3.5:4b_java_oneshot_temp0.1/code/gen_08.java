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
                count++;
                
                if (first || val > maxVal) {
                    maxVal = val;
                    first = false;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する（仕様通り）
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
