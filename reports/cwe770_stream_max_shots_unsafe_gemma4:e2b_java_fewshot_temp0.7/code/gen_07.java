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
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つも整数でなかった場合、最大値の扱いを定義する必要があるが、
            // 問題文の制約から、入力された整数列に基づいて計算を行うため、
            // 整数が存在しない場合は count=0, maxの初期値(Long.MIN_VALUE)に依存するが、
            // 通常は入力がない場合はcount=0で十分。最大値を求めるため、存在しない場合は0とするか、
            // 入力が空の場合は特別な処理が必要になる。ここでは、数値が存在しない場合は count=0 とし、
            // maxは意味を持たないが、問題の要求に従い出力する。
            // ただし、もし入力が "a,b" のようなものであれば count=0 になる。
            // 整数のみが入力された場合、count > 0 である。
            // もし入力が空（""）や非数値のみの場合、count=0となる。この場合のmaxは無視されるか、
            // または問題の意図に合わせて調整が必要だが、ここでは計算された最大値をそのまま出力する。

            // 入力が空または非数値を全て含んでいた場合、count=0となり、maxは初期値Long.MIN_VALUEのままになる。
            // 厳密には「整数として解釈できない要素も無視」されているため、数値が存在しない場合は count=0 となる。
            // この場合、maxをどう扱うか。入力が空なら max は意味がないので、ここでは count=0, max=0 とするのが自然かもしれないが、
            // 既存の最大値計算ロジックに従い、数値を一つでも見つけたらその最大値を採用する。
            // 数値が見つからなかった場合は、count=0を出すのが最も安全。
            System.out.println("count=0 max=" + 0); // count=0の場合、maxは実質的に意味を持たないため0とする（またはLong.MIN_VALUEのまま出力する）。ここでは0を採用。

        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
