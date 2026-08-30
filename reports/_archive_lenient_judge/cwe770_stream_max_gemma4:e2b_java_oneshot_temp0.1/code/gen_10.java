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
                // 64bit整数として解釈
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

        if (!foundNumber) {
            // 有効な整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を設定する。
            // 仕様上、読み込んだ要素数と最大値を出力する必要があるため、入力されたカンマ区切りの要素数をカウントする。
            // ただし、ここでは「整数として解釈できた要素」の数をカウントするのが自然だが、
            // 「要素数」が入力文字列の分割数なのか、有効な数値の数なのかを明確にする必要がある。
            // 例1の形式に倣い、読み込んだカンマ区切りの要素数（ただし数値として有効なもののみ）と最大値を出す。
            // ここでは、実際にパースできた整数の数をcountとする。もし0個ならmaxは未定義だが、ここでは0とする。
            if (count == 0) {
                System.out.println("count=0 max=0");
            } else {
                 System.out.println("count=" + count + " max=" + max);
            }

        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
