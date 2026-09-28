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
            // 要素が一つも数値でなかった場合、maxの出力は定義されないが、
            // 仕様に従い count=0 max=（適切な値）を出力する。
            // ここでは、数値が存在しない場合の最大値をどう扱うか明確でないため、
            // 読み込んだ数値がない場合は max を初期値のままにするか、
            // または問題の意図を考慮して適切に設定する必要がある。
            // 例として、数値が一つもなかった場合は max=0 とするか、あるいは最小値を出力する。
            // 今回は「最大値」が出力されることを前提とし、もし数値が一つもなければ、
            // 読み込んだ範囲で意味のある最大値を出す必要がある。
            // 数値が存在しない場合、maxの初期値 Long.MIN_VALUE は適切ではないため、
            // count=0 の場合は max を無視するか、またはデフォルト値（例: 0）を設定する。
            // 例2, 例1では数値が保証されているため、ここでは読み込んだ数値に基づき出力する。
            // 数値が存在しない場合、maxの初期値 Long.MIN_VALUE はそのまま残り、
            // count=0 となるため、maxが出力されることになる。
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 数値が一つもなかった場合、最大値は定義できないが、
            // 読み込んだ要素数と合わせて出力する。ここでは最大値を0とする（空集合の最大値として）
            System.out.println("count=0 max=0");
        }
    }
}
