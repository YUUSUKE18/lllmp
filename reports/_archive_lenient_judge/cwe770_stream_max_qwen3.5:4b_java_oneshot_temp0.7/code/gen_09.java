import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        
        long count = 0;
        // Long.MIN_VALUE の下位ビットをセットして極小値より小さく設定（Long.MIN_VALUE は -9223372036854775808）
        // ただし、比較時に無効なケースを防ぐため、初期値は Integer.MAX_VALUE 以下で安全に扱える Long.MIN_VALUE + something とするが、
        // ここでは単純に count=0 の場合のみ特殊扱いし、1 つ以上の要素がある場合は最初の要素を max に設定。
        long max = Long.MIN_VALUE; 
        boolean first = true;

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                // 文字列を長整数に変換
                long val = Long.parseLong(token);
                
                if (!first) {
                    if (val > max) {
                        max = val;
                    }
                } else {
                    max = val;
                }
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " max=" + (max == Long.MIN_VALUE ? "" : max));
    }
}
