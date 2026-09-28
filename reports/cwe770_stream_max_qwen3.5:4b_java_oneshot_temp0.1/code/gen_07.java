import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を決定する必要があるが、仕様上は入力がない場合どうするか不明。通常は count=0, max=? のような形式だが、ここでは最小値またはエラー扱いにするか。例1では max=0 で初期化していたので同様に扱う。
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
        } else {
            StringTokenizer st = new StringTokenizer(line);
            long count = 0;
            long maxVal = Long.MIN_VALUE; // 64bit integer の最小値
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    long val = Long.parseLong(token.trim());
                    if (!Long.isInfinite(val)) { // 無限大チェック（実際は整数なので不要だが、安全のため）
                        count++;
                        if (count == 1 || val > maxVal) {
                            maxVal = val;
                        }
                    } else {
                        continue; 
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }

            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
