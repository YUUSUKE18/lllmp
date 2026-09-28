import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean readingNumber = false;
        long currentNumber = 0;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b >= '0' && b <= '9') {
                    // 数字を読み取り、currentNumberを更新
                    currentNumber = currentNumber * 10 + (b - '0');
                    readingNumber = true;
                } else if (b == ',') {
                    // カンマで区切られた要素の終わり
                    if (readingNumber) {
                        count++;
                        if (currentNumber > max) {
                            max = currentNumber;
                        }
                        currentNumber = 0;
                        readingNumber = false;
                    }
                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白文字は無視
                    if (readingNumber) {
                        // 数字の途中に空白があった場合、それは不正な形式として扱うか、
                        // ここでは読み取りを中断し、次の数字が来るのを待つ（または無視する）
                        // 仕様に従い、整数として解釈できない要素は無視するため、ここでは単に状態をリセットする。
                        readingNumber = false;
                    }
                }
            }
        }

        // 最後の要素の処理 (入力が終了した後にカンマがない場合)
        if (readingNumber) {
            count++;
            if (currentNumber > max) {
                max = currentNumber;
            }
        }

        // 空要素や不正な要素は無視されるため、countとmaxを最終結果として出力
        System.out.println("count=" + count + " max=" + max);
    }
}
