import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        int c = 0;
        boolean inNumber = false;
        long currentNumber = 0;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inNumber) {
                        c++;
                        if (currentNumber > max) {
                            max = currentNumber;
                        }
                        currentNumber = 0;
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    currentNumber = currentNumber * 10 + (b - '0');
                    inNumber = true;
                } else if (inNumber) {
                    // 数値の後に非数字文字が来た場合、これは無視される（カンマ区切りなので）
                    inNumber = false;
                }
            }
        }

        // 最後の要素の処理
        if (inNumber) {
            c++;
            if (currentNumber > max) {
                max = currentNumber;
            }
        }

        if (c > 0) {
            System.out.println("count=" + c + " max=" + max);
        } else {
            // 要素が一つもなかった場合（空入力など）
            System.out.println("count=0 max=" + Long.MIN_VALUE); // または仕様に合わせて適切な値を出力
        }
    }
}
