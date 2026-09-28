import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、空白や空文字列をフィルタリング
        Stream.of(line.split(","))
              .filter(s -> !s.trim().isEmpty())
              .forEach(s -> {
                  try {
                      long value = Long.parseLong(s.trim());
                      // ここでカウントと最大値を計算する（クラスレベル変数またはローカルスコープでの処理が必要）
                      // 今回はメインメソッド内で直接計算し、最後にまとめて出力する。
                  } catch (NumberFormatException e) {
                      // 整数として解釈できない要素は無視
                  }
              });

        // 再度読み込み、安全にパースして集計する
        long count = 0;
        long max = Long.MIN_VALUE;

        String[] parts = line.split(",");
        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
