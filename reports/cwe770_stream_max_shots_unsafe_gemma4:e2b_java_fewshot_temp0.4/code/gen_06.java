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
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (count == 0) {
            // 要素が一つも数値でなかった場合、最大値の出力方法を考慮する必要があるが、
            // 仕様に従い count=0, max=適切な値を出力する。
            // ここでは、数値が存在しない場合は max を初期値（Long.MIN_VALUE）のままにするか、
            // または問題文の意図を汲んで 0 や特別な値を設定する必要があるが、
            // 通常は入力された数値のみを考慮するため、count=0 の場合は max は意味を持たない。
            // 例として、もし数値が存在しなければ最大値は定義されないと解釈し、
            // count=0, max=0 とするか、あるいは空の入力を想定しないと仮定する。
            // 厳密に「最大値」を求めるため、入力された数値のみを考慮し、何も数値がなければ max は初期値のままになる。
            // ただし、例1の挙動から、数値が存在すればその最大値を出すべき。
            // 数値が一つもなかった場合は、max の出力は任意だが、ここでは count=0 となるため、
            // 便宜上、入力された数値を考慮しないとして max を初期値のままにするか、
            // 最小の64bit整数を返すのが自然。
            // ここでは、数値が存在しない場合の最大値は定義されないとみなし、count=0 の場合は max は無視する（または適切なデフォルト値）。
            // 例に従い、もし数値を一つも読み取れなかった場合、max を 0 とする（安全策として）
             if (count == 0) {
                 max = 0; // 数値がない場合の最大値は 0 とする（任意だが、ここでは安全策）
             }
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
