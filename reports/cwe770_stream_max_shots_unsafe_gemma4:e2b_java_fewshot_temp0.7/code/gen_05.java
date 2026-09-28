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
            // 要素が一つも数値でなかった場合、最大値は定義されないか、あるいは適切なデフォルト値を設定する必要がある。
            // 仕様上「要素数」と「最大値」を求めるため、要素数が0なら最大値の出力も考慮する。
            // ここでは、要素が0の場合は最大値としてMIN_VALUE（または0）を出力するのが妥当だが、
            // 読み取った数値が存在しない場合は、最大値を特定できないことを示すために、
            // 読み取った数値を基に計算された結果を出す。
            // もし入力が空なら count=0, max=Long.MIN_VALUE となる。
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
