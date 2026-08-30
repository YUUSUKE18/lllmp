import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 空の入力があった場合、最大値が初期値のままになる可能性があるため、
        // 要素数も正しくカウントされているか確認する。
        if (count == 0) {
            // 入力が空または無効な場合（ただし仕様上は「要素数と最大値」を出力するため、0を出す）
            max = 0; // もし入力が全くなかった場合は max=0 とするのが妥当かもしれないが、ここでは読み取った値に基づいて計算する。
                   // 入力が空なら count=0, max=Long.MIN_VALUE のままになるが、問題の意図から、有効な要素があればその最大値を出すべき。
                   // 0個の要素があれば最大値は定義できないため、0として扱うか、または入力が存在しない場合は特別な処理が必要だが、ここでは読み取った数と最大値を出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
