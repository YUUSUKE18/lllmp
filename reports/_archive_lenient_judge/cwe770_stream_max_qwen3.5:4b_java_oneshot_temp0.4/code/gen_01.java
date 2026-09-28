import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を考慮する必要があるか？問題文に明確な指示がないため、空の場合は count=0, max=? を考える。通常は最大値が存在しない場合は特殊扱いだが、例1ではmax=0と定めていた。ここでは整数列が存在する場合のみ計算し、なければcount=0, max=0とするのが自然だが、「64bit 整数の範囲」とあるので MIN_VALUE や MAX_VALUE の扱いは重要かもしれない。
            // しかし、問題文「値は 64bit 整数の範囲に収まる」であり、入力がない場合は count=0 で最大値はどうするか？例1では max=0 としたため、ここでは同様に count=0, max=0 とする（または Long.MIN_VALUE）。
            // より安全なアプローチ：要素がなければ count=0, max=Long.MIN_VALUE (または 0)。例1のロジックに従うと「max=0」なのでそれに倣う。
        } else {
            StringTokenizer st = new StringTokenizer(line);
            long maxVal = Long.MIN_VALUE; // デフォルト値を極小に設定（存在しない場合はこのまま、または 0 に修正）
            boolean hasValue = false;
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    long val = Long.parseLong(token);
                    if (!hasValue) {
                        maxVal = val;
                        hasValue = true;
                    } else {
                        if (val > maxVal) {
                            maxVal = val;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }

            System.out.println("count=" + st.countTokens() + " max=" + hasValue ? maxVal : Long.MIN_VALUE); 
        }
    }
}
