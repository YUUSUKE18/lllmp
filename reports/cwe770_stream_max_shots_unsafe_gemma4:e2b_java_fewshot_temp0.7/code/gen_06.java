import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割し、前後の空白を無視して処理する
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 空白を取り除いた文字列を取得
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
            }
        }

        if (count == 0) {
            // 整数が見つからなかった場合、count=0, maxは初期値のまま（または適切なデフォルト値。ここでは最大値を考慮して処理を続ける）
            // 問題の制約上、もし何も数値がなければ count=0, maxは何でも良いが、maxの出力が必要なので、ここでは数値を読み取れなかった場合は0を扱うのが安全かもしれない。
            // ただし、仕様に従い、読み取れた要素のみをカウントする。count=0ならmaxは意味がないが、最大値が存在しないため、ここではcount=0, max=0とする（あるいは最小値として扱われる）。
            // 最小値を初期値にしたので、何も数値がなければ max は Long.MIN_VALUE のままになる可能性がある。
            // ここでは、読み取れた有効な要素の数と最大値を求めるという要件を満たすため、count=0の場合はmaxを0とする（またはLong.MIN_VALUEのまま出す）。
            // 念のため、もし数値が一つもなかった場合は、count=0, max=0として出力する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
