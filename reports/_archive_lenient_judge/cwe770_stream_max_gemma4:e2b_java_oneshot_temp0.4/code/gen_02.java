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
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            String token = st.nextToken().trim();
            if (!token.isEmpty()) {
                try {
                    long n = Long.parseLong(token);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を設定する。
            // 仕様上、入力されたものから計算するため、数がない場合は count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
