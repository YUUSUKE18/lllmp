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
            // 要素が一つも数値でなかった場合、最大値は定義されないか、あるいは問題の意図に従う。
            // ここでは、要素数が0の場合は最大値を適切な値（例えば0や最小値）とする必要があるが、
            // 読み込んだ数値がない場合は max の出力が意味をなさないため、ここでは count=0, max=0 と仮定する。
            // ただし、問題文の制約から、もし数値が存在しなければ max は初期値のままになるか、
            // または空の入力に対する振る舞いが重要となる。
            // 読み込んだ数値がない場合は、count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
