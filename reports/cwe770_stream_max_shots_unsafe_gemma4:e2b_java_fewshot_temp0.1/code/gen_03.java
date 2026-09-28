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
            // 厳密に「整数として解釈できない要素も無視」という指示に基づき、数値が存在しない場合はcount=0となる。
            // 最大値については、数値が存在しない場合の挙動を明確にするため、ここでは最大値を初期値のまま（Long.MIN_VALUE）または0とするが、
            // 多くの競技プログラミングの文脈では、要素がない場合はmaxは意味を持たないことが多い。
            // ただし、例示された出力形式に従うため、count=0, max=0と仮定する。（もし数値が存在しないなら最大値は存在しないため）
            // ここでは、数値が一つもなかった場合は count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
