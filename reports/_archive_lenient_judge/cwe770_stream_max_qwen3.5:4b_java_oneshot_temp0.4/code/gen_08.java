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
        long maxValue = Long.MIN_VALUE; // 64bit integer の最小値
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            try {
                long val = Long.parseLong(token.trim());
                
                if (!Long.isInfinite(val)) { 
                    count++;
                    if (count == 1 || val > maxValue) {
                        maxValue = val;
                    }
                } else {
                    // NaN や無限大は整数として解釈できないため無視（ただし Long.parseLong はこれらを返さない）
                    // Java の long パースでは NaN/Inf を扱えないので、上記 try-catch でカバーされるが、
                    // 念のため有効な数値のみカウントするロジックを明確にする。
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
