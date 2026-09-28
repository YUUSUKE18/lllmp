import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        long currentNumber = 0;
        boolean inNumber = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inNumber) {
                        count++;
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
                    // 整数として解釈できない文字が来た場合、これは無視される（仕様に基づき）
                    inNumber = false;
                    currentNumber = 0;
                }
            }
        }

        // 最後の要素の処理
        if (inNumber) {
            count++;
            if (currentNumber > max) {
                max = currentNumber;
            }
        }

        // 空要素や前後の空白は無視されるため、countとmaxを計算した結果を出力する
        System.out.println("count=" + count + " max=" + max);
    }
}
