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
            // 要素が一つも存在しない場合、最大値は定義できないか、あるいは0など。
            // 仕様に明確な指定がないため、ここでは空のリストに対する処理を考慮し、
            // 読み取った有効な数値が存在しない場合は最大値を適切に設定する。
            // ただし、通常、最大値問題では入力が存在する場合を想定するが、
            // 念のため、もし数値を一つも読み取れなかった場合は max を初期値（Long.MIN_VALUE）のまま出力するか、
            // または適切なデフォルト値（例えば0やエラーを示すもの）を選ぶ必要がある。
            // ここでは、入力された数値が存在しない場合の最大値を考慮し、count=0ならmaxは意味をなさないが、
            // 読み取った数値を基に出力する。もし入力に有効な整数が一つもなかった場合、
            // max は Long.MIN_VALUE のままになるため、count=0として出力する。
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 数値が一つもなかった場合は count=0, max=? となるが、
            // 例として、読み取った数値を正しく反映させるため、最大値の出力は count > 0 の場合に限定する。
            // もし入力が空または非数値のみの場合、count=0が出力される。
             System.out.println("count=0 max=" + Long.MIN_VALUE); // あるいは適切なデフォルト値を設定（ここでは例示のため）
        }
    }
}
