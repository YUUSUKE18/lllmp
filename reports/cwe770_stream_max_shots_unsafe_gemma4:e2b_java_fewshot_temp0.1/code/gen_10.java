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
            // ここでは、要素数が0の場合、maxを適切な値（例えば0や最小値）として扱うが、
            // 読み込んだ数値がない場合はcount=0, max=Long.MIN_VALUEとなる。
            // 問題文の制約から、少なくとも1つの整数が存在すると仮定するか、
            // count=0の場合は最大値をどうするかを明確にする必要がある。
            // 例として、もし要素が一つもなかったら、count=0, max=0とする（またはLong.MIN_VALUE）。
            // 読み込んだ数値がない場合は、maxの初期値であるLong.MIN_VALUEをそのまま出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
