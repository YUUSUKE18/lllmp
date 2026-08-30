import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
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
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 空要素や非数値要素を無視した上で、有効な整数の数と最大値を計算する
        if (count == 0) {
            // 要素が一つもなかった場合、最大値は定義できないが、仕様に従い適切な値を設定する（ここでは0とする）
            max = 0;
        } else {
            // 最初の要素を基準として再確認する必要はない。上記ループで正しく計算されているはず。
            // ただし、もし入力が空文字列のみだった場合など、count=0になるケースを考慮して max の初期値を調整する。
            // 今回は count > 0 なら max は更新されているため、そのまま出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
