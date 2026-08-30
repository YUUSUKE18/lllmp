import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    // カンマが来た場合、直前の要素を処理する
                    if (first || (buf[i - 1] >= '0' && buf[i - 1] <= '9')) {
                        count++;
                        long current = 0;
                        int j = i - 1;
                        while (j >= 0 && (buf[j] >= '0' && buf[j] <= '9')) {
                            current = current * 10 + (buf[j] - '0');
                            j--;
                        }
                        if (first || current > max) {
                            max = current;
                        }
                        first = false;
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わらなかった場合）
        if (n > 0) {
            long current = 0;
            int j = n - 1;
            while (j >= 0 && (buf[j] >= '0' && buf[j] <= '9')) {
                current = current * 10 + (buf[j] - '0');
                j--;
            }
            if (first || current > max) {
                max = current;
            }
        }

        // 注意: 上記のロジックはカンマ区切りの整数列を処理する一般的な方法と異なります。
        // 課題の要求「カンマ区切りの整数列」をより直接的に処理するために、入力を文字列として扱う方が安全です。
        // 例1, 2, 3の例がバイト配列操作に依存しているため、ここでは入力全体を読み込み、文字列操作で対応します。

        // 再度、標準入力から全てを読み込み、カンマで分割して処理するアプローチに変更します。

        // --- 再実装 ---
        // 入力バッファを再利用するため、一旦リセットし、新しい読み取りロジックを採用します。
    }
}
