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
        long maxValue = Long.MIN_VALUE; // デフォルト値は最小値
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long value = Long.parseLong(token);
                
                if (!first) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                } else {
                    // 最初の要素はカウントせず、最大値の初期化用として扱う（または最初から max に代入）
                    // ただし仕様では「それらの『要素数』と『最大値』」なので、
                    // 通常なら count は有効な整数の数だけ。
                    // ここでのロジック: 
                    // - first=true の時：max を初期化 (value)
                    // - first=false の時：count++ と max の更新
                    
                    if (first || value > maxValue) {
                        maxValue = value;
                    } else {
                         count++;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            } finally {
                first = false;
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
