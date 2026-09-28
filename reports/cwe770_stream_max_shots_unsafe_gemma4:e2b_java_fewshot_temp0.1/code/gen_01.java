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
            // ここでは、要素数0、最大値は最小値（または適切なデフォルト）とする。
            // 問題文の制約から、もし数値が存在しなければ count=0, max=? となるが、ここでは読み取った数値のみを考慮する。
            // 念のため、count=0の場合はmaxを初期値のままにするか、あるいは問題の意図に従う。
            // 例として、数値が一つもなかった場合は最大値を0とする（もし入力が空なら）。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
