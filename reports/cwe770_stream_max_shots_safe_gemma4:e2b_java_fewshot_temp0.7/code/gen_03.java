import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
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
                        if (!foundFirst || currentNumber > max) {
                            max = currentNumber;
                        }
                        currentNumber = 0;
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    currentNumber = currentNumber * 10 + (b - '0');
                    inNumber = true;
                }
            }
        }

        // 最後の要素の処理
        if (inNumber) {
            count++;
            if (!foundFirst || currentNumber > max) {
                max = currentNumber;
            }
        }

        if (count == 0) {
            // 要素が一つもなかった場合、最大値は定義できないが、仕様上、入力がない場合は count=0, max=最小値とするか、あるいは入力がない場合は何も出力しないという解釈が可能だが、ここでは少なくとも1行出力する。
            // 入力が空だった場合の一般的な挙動として、count=0, max=0などとするのが妥当かもしれないが、今回は「整数列を読み」なので、何も読み取れなかった場合は 0 を出力する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
