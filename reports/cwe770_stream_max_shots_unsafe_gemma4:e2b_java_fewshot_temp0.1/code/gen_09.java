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
            // ここでは、要素数0、最大値は最小値（または適切なデフォルト）とする。
            // 問題文の制約から、もし数値が存在しなければ count=0, max=? となるが、
            // 読み込んだ数値がない場合は、maxを初期値(Long.MIN_VALUE)のまま出力する。
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
