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
            // 要素が一つも数値でなかった場合、最大値の出力方法を考慮する必要があるが、
            // 仕様に従い、もし数値が存在しなければ max の値はどうなるか。
            // ここでは、数値が存在しない場合は count=0, max=適切な初期値（例：0やMIN_VALUE）となるが、
            // 課題の意図から「存在する数のみを考慮する」と解釈し、countが0ならmaxは意味を持たないかもしれない。
            // ただし、最大値を求めるのであれば、数値が存在しない場合は max をどうするか。
            // 例として、入力に数値が一つもなかった場合は count=0, max=0 と仮定する（または初期値のまま）。
            // 厳密には「存在する要素」の最大値を求めよ、なので、存在しない場合は特別な指示がないため、
            // 読み取った数があればその最大値を出す。ここでは、数値が存在すればmaxが更新されることを保証する。
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 数値が一つもなかった場合、count=0, max=? とする。
            // 最小値を初期値として使用したまま出力する。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // または適切なデフォルト値。ここでは入力がない場合は count=0 で十分かもしれないが、maxを要求されているため。
        }
    }
}
