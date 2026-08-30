import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long max = Long.MIN_VALUE; // 64bit integer の最小値
        
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long n = Long.parseLong(token.trim());
                    
                    // 最大値の初期化と更新ロジックを統合し、空でない要素のみカウントする
                    if (count == 0 || n > max) {
                        max = n;
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視（仕様通り）
                }
            }
        } else {
            // エラー処理やデフォルト値を設定する必要がある場合があるが、
            // 本課題では入力がないと count=0, max は未定義になる。
            // ただし例1のコードは line!=null の中で処理しているため同様に扱う。
            // もしすべての要素が無効な場合は count が 0 で max は Long.MIN_VALUE を維持する。
        }

        System.out.println("count=" + count + " max=" + (max == Long.MIN_VALUE && count > 0 ? String.valueOf(max) : (count == 0 ? "" : String.valueOf(max)))); 
    }
}
