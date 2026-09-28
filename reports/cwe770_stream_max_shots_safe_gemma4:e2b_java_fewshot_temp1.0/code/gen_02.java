import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
        long max = Long.MIN_VALUE;
        long currentNumber = 0;
        boolean readingNumber = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (readingNumber) {
                        count++;
                        if (currentNumber > max) {
                            max = currentNumber;
                        }
                        currentNumber = 0;
                        readingNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 現在読み込んでいる数値が64bitの範囲内に収まるかチェック（ここでは単純に読み込み続ける）
                    currentNumber = currentNumber * 10 + (b - '0');
                    readingNumber = true;
                } else if (readingNumber) {
                    // 数字以外で区切りが発生した場合、前の数値が確定したと見なす（ただし仕様ではカンマ区切りなので、数字以外は無視する）
                    // この処理は、連続する数字を一つの整数として扱うため、ここでは単に無視する。
                    readingNumber = false;
                }
            }
        }

        // 最後の要素の処理（入力がEOFで終わった場合に対応するため）
        if (readingNumber) {
            count++;
            if (currentNumber > max) {
                max = currentNumber;
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合、最大値は意味をなさないが、0を出力する
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
