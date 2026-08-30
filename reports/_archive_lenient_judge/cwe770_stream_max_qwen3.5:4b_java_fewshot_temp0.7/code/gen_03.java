import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long max = Long.MIN_VALUE;
        boolean first = true;
        int count = 0;
        
        if (line != null && !line.trim().isEmpty()) {
            StringTokenizer st = new StringTokenizer(line, ",");
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                // 空白のみまたは空文字をスキップ
                if (!token.trim().isBlank()) {
                    try {
                        long value = Long.parseLong(token);
                        
                        // 最大値の初期化（最初の有効要素）または更新
                        if (first) {
                            max = value;
                            first = false;
                        } else {
                            if (value > max) {
                                max = value;
                            }
                        }
                        count++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
