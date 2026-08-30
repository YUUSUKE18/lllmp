import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 64bit integer の最小値
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token.trim());
                
                if (!Long.isInfinite(val)) { 
                    count++;
                    
                    if (count == 1 || val > maxVal) {
                        maxVal = val;
                    }
                } else {
                    // NaN や無限大は整数として解釈しない（問題文の意図から）
                    continue;
                }
            } catch (NumberFormatException e) {
                // 整数として解析できない場合は無視
            }
        }

        if (count == 0 && maxVal != Long.MIN_VALUE) {
             System.out.println("count=0 max=" + maxVal);
        } else if (count > 0 || maxVal == Long.MIN_VALUE) { // count が 0 の場合、max は初期値のままでも OK と解釈するか？通常は空の場合 max を定義しないが、例1では常に出力している。ここでは count=0 でも max=0 にする方が安全か？
             // 問題文の「最大値を求めます」という指示から、要素がない場合は何らかのデフォルトが必要だが、例1では max=0 が初期化されている。
             // ここでも同様に、count=0 の場合も max を出力すべきと考えるが、空集合の最大値は未定義であることが多い。
             // しかし、コードのロジックを単純にするため、maxVal は count>0 かつ要素がある場合に更新されるようにし、
             // もし count==0 であれば max=0 とする（例1と同じ挙動）。
        }

        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
