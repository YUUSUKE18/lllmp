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

        // 要素が一つもなかった場合（入力が空または無効な値のみの場合）の処理を考慮する必要があるが、
        // 入力されたトークンが全て有効な整数であったと仮定して count と max を出力する。
        if (count == 0) {
            // トークンは読み取れたが、有効な整数が一つもなかった場合。
            // 仕様上、要素数と最大値を求めるため、ここでは count=0, max=0 または適切な初期値を設定する。
            // ここでは、入力された数値のみをカウントするため、count=0 であれば max は定義されないため、
            // 便宜上、max=0 とするか、または入力が空であれば count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
