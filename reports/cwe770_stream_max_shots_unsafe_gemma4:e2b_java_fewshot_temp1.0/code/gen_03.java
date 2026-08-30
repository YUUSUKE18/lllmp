import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割し、前後の空白をトリムして要素を取得する
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
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
                // 整数として解釈できない要素は無視する
            }
        }

        if (count == 0) {
            // 数値が一つも見つからなかった場合、個数は0、最大値は定義しない（ここでは便宜的に0または特別な値だが、仕様上数値がある前提で進める）
            // 問題の制約から「要素数と最大値を求めよ」なので、入力に有効な整数が一つもなければcount=0, maxは不定となる。
            // 少なくとも1行出力する必要があるため、もしcountが0ならmaxは意味をなさなくなるが、ここでは見つかった値に基づき出力する。
        }

        if (foundNumber) {
             System.out.println("count=" + count + " max=" + max);
        } else {
            // 整数要素が一つもなかった場合（count=0）、最大値は定義できないが、count=0として出力する。
            // 最大値を求められない場合の最大値の扱いは問題文に明記されていないため、ここでは入力された数値がない場合は、maxを適切に設定する必要がある。
            // ただし、もしリストが空なら count=0, max=? となる。例1, 2, 3のパターンに従い、有効な数が見つかった場合のみ出力する。
            // 厳密に「要素数と最大値」を求めるという指示に基づき、数値が存在しない場合は個数0で終了する。
             System.out.println("count=0 max=0"); // count=0として何か値をセットする必要があるが、ここでは安全策として0とする。
        }
    }
}
