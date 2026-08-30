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
            // 要素が一つも数値でなかった場合、最大値は定義されないか、適切なデフォルト値が必要だが、
            // 仕様に従い、読み込んだ有効な要素数と最大値をそのまま出力する。
            // 数値が存在しない場合は max の初期値（Long.MIN_VALUE）が出力されることになるため、
            // count=0 の場合は max も適切に扱う必要がある。ここでは、数値が存在しない場合の挙動を考慮し、
            // 読み込んだ有効な要素数と最大値をそのまま出力する。
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 数値が一つもなかった場合、count=0 で、max は初期値のままになるが、
            // 厳密には「最大値」が存在しないため、ここでは count=0 と、最大値を意味のない値（例えば 0 や最小値）で出力する。
            // ただし、例題の形式に従い、読み込んだ結果をそのまま出力することが求められるため、
            // 数値が一つもなかった場合は max が Long.MIN_VALUE のままになることを許容するか、
            // または count=0, max=0 などとするか判断が必要。
            // ここでは、数値が存在しない場合は count=0 で最大値は定義されないとみなし、maxを0として扱うのが自然かもしれないが、
            // 読み込んだ要素から計算した結果を出すため、count=0 の場合は max を無視して出力する。
            // 例題の形式に厳密に従い、数値が存在しない場合の挙動を最小限にするため、
            // 数値が見つからなかった場合は count=0, max=0 とする（最大値は非存在として扱う）。
             System.out.println("count=0 max=0"); // ゼロ要素の場合の安全策
        }
    }
}
