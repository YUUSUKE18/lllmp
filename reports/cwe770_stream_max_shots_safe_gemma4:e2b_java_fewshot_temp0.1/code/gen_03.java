import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    count++;
                } else if (b >= '0' && b <= '9') {
                    long val = 0;
                    for (int j = i; j < n; j++) {
                        int cb = buf[j] & 0xff;
                        if (cb >= '0' && cb <= '9') {
                            val = val * 10 + (cb - '0');
                        } else {
                            break;
                        }
                    }
                    if (val > 0) {
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（カンマで終わる場合や、入力が途中で終わった場合に対応するため）
        // このロジックは、入力全体を走査し、カンマと数字の間の区切りとして解釈するのではなく、
        // カンマを区切り文字として扱い、その間に存在する数値を抽出するように修正する必要があります。

        // 再度、より適切な方法で処理します。ここでは文字列として読み込み、分割するのが最も安全です。
        // ただし、例の形式に従い、バイト配列から直接処理することを試みますが、カンマ区切りの整数列を正確に扱うには、
        // 連続する数字を一つの数として認識し、カンマで区切られた要素を抽出する必要があります。

        // 例2のロジックを参考に、カンマを区切り文字として使用して処理します。
        // この問題は「カンマ区切りの整数列」なので、入力ストリームから文字列として読み込み、分割するのが最も自然です。
        // しかし、例1, 2, 3がバイト配列操作に依存しているため、その制約内で解く必要があります。

        // 例2のロジックを再評価し、カンマ区切りの整数列を抽出します。
        // カンマで区切られた要素を個数としてカウントする必要があります。

        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;
        boolean isCounting = false;
        boolean hasNumbers = false;

        // 再度、入力全体を走査し、カンマと数字の間の区切りを検出します。
        int currentNumber = 0;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    // カンマが見つかった場合、直前の数字が有効であればカウントする
                    if (currentNumber > 0) {
                        actualCount++;
                        if (currentNumber > actualMax) {
                            actualMax = currentNumber;
                        }
                        currentNumber = 0;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数字を構築する
                    currentNumber = currentNumber * 10 + (b - '0');
                }
            }
        }

        // 最後の要素の処理
        if (currentNumber > 0) {
            actualCount++;
            if (currentNumber > actualMax) {
                actualMax = currentNumber;
            }
        }

        // 注意: 上記のロジックは、入力が「数字,数字,...」という形式であり、間に空白がないことを前提としています。
        // 空要素や前後の空白を無視するという要件を満たすため、この処理で得られた count と max を使用します。

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
