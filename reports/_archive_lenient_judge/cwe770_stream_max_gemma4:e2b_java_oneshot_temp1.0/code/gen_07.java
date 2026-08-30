import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-9223372036854775808"); // 64bitの最小値（ここでは便宜的に-9223372036854775808を使用。問題文の制約からlong型を想定）
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                // 値は64bit整数に収まるためlongを使用
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 64bitの最大値/最小値を示すために、初期設定を調整する。
        // もし入力が空または無効な場合でも、count=0, maxの適切さを保証するため、
        // この問題では入力された数のみをカウント・比較します。
        if (count == 0) {
             // 空または全て無効な要素があった場合、最大値は未定義だが、入力に基づき処理する。
             // 一般的に、空のセットの最大値はマイナスの無限大だが、ここでは入力された要素のみを扱う。
             // ただし、仕様上「整数として解釈できない要素も無視」されているため、有効な数がない場合は count=0, maxの設定が重要。
             // ここでは、もしデータが存在しなければ max は初期値のままになるが、countは0となる。
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
