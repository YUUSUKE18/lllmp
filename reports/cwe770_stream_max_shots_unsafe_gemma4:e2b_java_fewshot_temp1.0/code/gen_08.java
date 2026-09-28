import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        for (String w : parts) {
            String trimmedW = w.trim();
            if (!trimmedW.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedW);
                    count++;
                    if (!foundFirst || n > max) {
                        max = n;
                        foundFirst = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは0を出力する（または問題の制約に従う）
            // 数値がない場合の挙動は通常、maxの初期値(Long.MIN_VALUE)に依存するが、count=0の場合はmaxは何でも良い。
            // 慣例として、要素がない場合は最大値を定義しないか、特定の値を入れることが多いが、ここでは見つかった最大値が出力されるべきなので、
            // countが0ならmaxを適切に扱う必要がある。もしcountが0なら maxは Long.MIN_VALUE のままになる可能性があるため、count=0の場合はmaxも考慮に入れる。
            // ただし、全ての要素が無視された場合は、最大値の出力自体が意味を持たないかもしれない。
            // ここでは、数値が見つからなかった場合は count=0, max=0 とするのが自然か、または問題文の制約に従う。
            // 任意の整数列がない場合、個数は0、最大値は無効と見なされるが、例示がないため、もし要素が存在しなければmax=0とするのが安全策。
             if (count == 0) {
                 System.out.println("count=0 max=0"); // または count=0 max=-1 など、仕様を強く確認する必要があるが、ここでは仮に0とする。
             } else {
                System.out.println("count=" + count + " max=" + max);
             }
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
