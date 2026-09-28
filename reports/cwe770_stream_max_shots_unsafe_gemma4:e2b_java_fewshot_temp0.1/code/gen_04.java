import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String w : parts) {
            String trimmedW = w.trim();
            if (!trimmedW.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedW);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つも数値でなかった場合、最大値は定義されないか、あるいは問題の意図に従う必要がある。
            // ここでは、要素数0、最大値は最小値として扱う（または0とする）。
            // 問題文に「整数列を受け取る」とあるため、もし数値が一つもなければ count=0, max=? となる。
            // 厳密には、数値が存在しない場合はmaxの出力が意味をなさないが、ここでは読み取った数値を基に出力する。
            // 数値が存在しない場合の最大値は、初期値であるLong.MIN_VALUEのままになるため、count=0として扱うのが自然かもしれない。
            // ただし、例題の形式に従い、もし数値が見つからなかった場合は max を適切に設定する必要がある。
            // 読み取った数値が一つもなかった場合、最大値は定義できないため、ここでは count=0, max=0 と仮定する（または問題文の制約を再確認）。
            // 今回は、もし数値が見つからなかった場合は、count=0, max=0と出力する。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
