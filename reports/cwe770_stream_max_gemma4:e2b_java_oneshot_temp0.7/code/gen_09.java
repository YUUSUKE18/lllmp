import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long max = Long.MIN_VALUE;

        while (st.hasMoreTokens()) {
            String token = st.nextToken().trim();
            if (!token.isEmpty()) {
                try {
                    // 値は64bit整数として解釈
                    long n = Long.parseLong(token);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // データが存在しない場合（全て無効なトークンだった場合）の処理を考慮し、count=0, max=0で出力する。
        if (count == 0) {
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
