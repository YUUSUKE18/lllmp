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

        // カンマで分割してトークンを処理
        String[] tokens = line.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // long型としてパース（64bit整数）
                long n = Long.parseLong(trimmedToken);
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 整数として解釈できた要素のみをカウントする（仕様の解釈：カンマ区切りのうち有効な数だけを数える）
        // もし「カンマで区切られた全てのフィールド」を個数とみなす場合は、countはtokens.lengthになるが、
        // 仕様が「整数列を受け取る」ため、実際に読み取れた整数の個数をカウントする。
        // 例： "1,2,a,3" -> 3個の整数(1, 2, 3)がある。

        // ここでは、カンマ区切りの文字列に含まれる有効な整数のみを数えるという解釈を採用する。

        System.out.println("count=" + count + " max=" + max);
    }
}
