import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long maxVal = Long.MIN_VALUE;
        int count = 0;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line, ",");
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                // 空白を含むトークンも整数として解析する必要があるため、trim を行う
                try {
                    long val = Long.parseLong(token.trim());
                    
                    if (!first || val > maxVal) {
                        maxVal = val;
                    }
                    count++;
                    first = false;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（ただし、count は増えない）
                }
            }
        } else if (!first) {
            // 空行が入力されていても max が初期値のままの場合の処理は不要だが、
            // min_value の場合のみ count=0, max=min に設定されるような仕様があるか確認が必要。
            // 今回は「最大値を求めます」とあるので、要素がない場合はどうするか？
            // 例1では空の場合は何も出力しなかったが、「整数列を受け取ります」なので、
            // 少なくとも何らかの処理を行うと解釈できる。ただし、問題文には明確な指定がないため、
            // 初期値を保持する（count=0, max=min）とするのが安全である。
        }

        System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : maxVal));
    }
}
