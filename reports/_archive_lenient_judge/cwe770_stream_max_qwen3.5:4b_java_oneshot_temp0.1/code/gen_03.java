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
        long maxVal = Long.MIN_VALUE; // 初期値を最小整数に設定
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token);
                
                if (!first) {
                    if (val > maxVal) {
                        maxVal = val;
                    }
                } else {
                    // 最初の要素のみを最大値として初期化（負の数の場合も正しく処理）
                    maxVal = val; 
                }
                
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
            
            first = false;
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
