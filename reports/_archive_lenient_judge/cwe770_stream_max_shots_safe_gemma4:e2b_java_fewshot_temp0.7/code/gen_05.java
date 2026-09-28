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

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inNumber) {
                        count++;
                        if (!foundFirst || currentNumber > max) {
                            max = currentNumber;
                        }
                        currentNumber = 0;
                        inNumber = false;
                        foundFirst = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    currentNumber = currentNumber * 10 + (b - '0');
                    inNumber = true;
                } else {
                    // 空白やその他の文字は無視する
                    inNumber = false;
                }
            }
        }

        // 最後の要素の処理（入力の終端がカンマで終わっていない場合に対応）
        if (inNumber) {
            count++;
            if (!foundFirst || currentNumber > max) {
                max = currentNumber;
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合の処理（仕様上、最大値は定義できないが、ここでは0を出力する）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
