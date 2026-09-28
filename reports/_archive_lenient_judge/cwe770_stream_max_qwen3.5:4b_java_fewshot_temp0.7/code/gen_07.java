import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long max = Long.MIN_VALUE; // 初期値を最小整数に設定（データが入らない場合の扱いも考慮）
        boolean hasData = false;   // データが存在するフラグ
        
        if (line != null) {
            StringTokenizer st = new StringTokenizer(line);
            int count = 0;
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long n = Long.parseLong(token.trim()); // 64bit整数なのでlongを使用
                    
                    if (!hasData) {
                        max = n;
                        hasData = true;
                    } else {
                        if (n > max) {
                            max = n;
                        }
                    }
                    
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する（仕様通り）
                }
            }
        } else {
            count = 0;
            hasData = false;
        }
        
        System.out.println("count=" + count + " max=" + (hasData ? String.valueOf(max) : Long.MIN_VALUE));
    }
}
