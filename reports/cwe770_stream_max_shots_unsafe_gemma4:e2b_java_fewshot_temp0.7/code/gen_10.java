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
            if (trimmedW.isEmpty()) {
                continue;
            }
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

        if (count == 0) {
            // 要素が一つもなかった場合、最大値については定義に依存するが、ここでは安全のため0または適切な値とする。
            // 問題の制約がないため、入力が空の場合は count=0, max=0 とするのが妥当と判断する。
            max = 0;
        } else {
            // 数値が見つかった場合のみ最大値を設定する（Long.MIN_VALUEは最大値として不適切）
            if (!foundFirst) {
                // すべての要素がNumberFormatExceptionだった場合（count > 0だが数値が一つもなかった場合）、maxをリセットする必要があるが、
                // このロジックではcountが正しくカウントされているため、少なくとも1つ以上の有効な数が見つかっていればmaxは更新されているはず。
                // ただし、上記ループ内でfoundFirstの管理を厳密に行うため、もしcount > 0でfoundFirstがfalseなら、それはありえないケース（全ての要素が空文字列や非数値）を意味する。
                // 実際には、有効な数が一つでもあればmaxは更新されている。もしcount>0でmaxが初期値のままなら、それは全てNumberFormatExceptionだったことになるため、ここでは最初の数値をmaxとするのが安全である。
                // 今回はsetFirstで処理しているので、foundFirstがtrueになっていればmaxは正しい。
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
