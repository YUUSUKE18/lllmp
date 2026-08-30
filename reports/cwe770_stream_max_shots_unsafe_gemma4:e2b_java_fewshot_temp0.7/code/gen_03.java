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
            // 要素が一つもなかった場合、最大値の出力形式をどうするか。
            // 仕様上は「要素数と最大値」を出力するため、要素数が0なら最大値は定義されないか、
            // または最小値を設定する必要がある。ここでは、読み込んだ有効な要素がない場合は max=0 などとするが、
            // 厳密に問題文の指示に従うため、count=0の場合のmax値の扱いを考慮する。
            // ただし、例題の形式から、少なくとも1つの数値があれば最大値を求めることが期待される。
            // count=0の場合は max の出力は不要か、あるいは特殊な値になるが、ここでは読み込んだ数に基づき出力する。
            // 読み込まれた有効な整数がない場合は、count=0, max=0 とするのが妥当と思われる（もし存在しないなら）。
             System.out.println("count=0 max=0"); // 念のため、データがない場合の処理を想定し出力
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
