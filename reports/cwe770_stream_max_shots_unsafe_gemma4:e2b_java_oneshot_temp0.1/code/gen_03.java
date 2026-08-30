import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、前後の空白を無視して整数としてパースする
        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 整数が見つからなかった場合、count=0 max=0 または適切なデフォルト値を設定する。
            // 仕様上、読み込んだデータから数えられた有効な整数のみを考慮するため、
            // 読み込んだ要素数（カンマ区切り）ではなく、実際にパースできた数の最大値とカウントを出力する。
            // ただし、ここでは「カンマ区切りの整数列を受け取る」という指示に基づき、
            // カンマで区切られた要素の総数をcountとして扱うのが自然だが、
            // 「整数として解釈できない要素も無視する」ため、パースできた数のみをカウントとする。

            // 読み込んだカンマ区切りの要素の総数を count とする（空要素や非数値は無視）
            // 再度、カンマで区切られた要素の総数をcountとして扱うように修正する。
            // 仕様：「要素数」と「最大値」を求める。これは入力されたカンマ区切り要素の総数と、それらの最大値であると解釈する。

            // 最初のループで count を「パースできた整数」としてカウントしていたため、
            // ここでは元のカンマ区切りの要素数を再計算する必要があるか、あるいは
            // 「要素数」を「有効な整数の個数」と解釈するかを明確にする必要がある。
            // 例1の形式に合わせるため、「パースできた整数」の個数をcountとする。

            if (count == 0) {
                // 有効な整数が一つもなかった場合、最大値は定義できない（または0）。
                // ここでは、入力された要素数と最大値を求めるため、有効な数が0個なら count=0, max=0 とする。
                System.out.println("count=0 max=0");
            } else {
                 System.out.println("count=" + count + " max=" + max);
            }

        } else {
            // 整数が見つかった場合
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
