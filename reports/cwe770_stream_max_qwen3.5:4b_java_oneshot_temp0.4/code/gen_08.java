import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    // 64bit整数として解析し、範囲外の場合は無視する（ただし問題文より「値は収まる」とあるので例外処理不要だが安全のため）
                    long n = Long.parseLong(token);
                    
                    if (first) {
                        maxValue = n;
                        first = false;
                    } else {
                        if (n > maxValue) {
                            maxValue = n;
                        }
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + maxValue);
    }
}
