import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を決定する必要があるが、仕様上は入力がない場合どうするか不明。通常は count=0, max=? の扱いが必要だが、例では min が使われているので同様に扱う。
            return; 
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        boolean first = true;
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long n = Long.parseLong(token.trim()); // 空白が含まれる可能性を考慮して trim を追加
                if (first) {
                    count++;
                    maxVal = n;
                    first = false;
                } else {
                    count++;
                    if (n > maxVal) {
                        maxVal = n;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
    
    private static long maxVal = Long.MIN_VALUE;
}
