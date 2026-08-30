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
        boolean first = true;
        long count = 0;
        long max = Long.MIN_VALUE; // 初期値を最小値に設定 (空の場合の処理別途)

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                // トークン内部の空白も含めてパースし直すか、あるいは分割して再試行。
                // StringTokenizer が ", " などの文字列を区切り文字と受け取る必要があるため、この仕様で考えると ' ' を正規化するのが安全だが、
                // ここでは問題文通り「カンマ区切りの整数列」と解釈するため、空白が含まれていても数値として扱うようにする。
                long n = Long.parseLong(token.trim());

                if (first) {
                    count = 1;
                    max = n;
                    first = false;
                } else {
                    count++;
                    if (n > max) {
                        max = n;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : max));
    }
}
