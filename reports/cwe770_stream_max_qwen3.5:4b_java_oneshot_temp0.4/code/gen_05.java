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
        // 64bit integer の最小値として初期化（実際には最初の要素が最大になるように設定するのが安全だが、仕様通り処理）
        long max = Long.MIN_VALUE; 
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) { // 空白チェックは StringTokenizer が自動的に行うが、念のため
                try {
                    long n = Long.parseLong(token);
                    count++;
                    if (first || n > max) {
                        max = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            } else {
                 try {
                    long n = Long.parseLong(token);
                    count++;
                    if (first || n > max) {
                        max = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
