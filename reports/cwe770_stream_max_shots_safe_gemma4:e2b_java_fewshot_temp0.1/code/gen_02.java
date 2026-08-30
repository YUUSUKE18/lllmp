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
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // 最後の要素の処理（カンマで終わっていない場合）
        if (n > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b != ',' && b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // カウントの調整: 読み込んだカンマの数から1を引く（要素数はカンマの数+1だが、ここではカンマで区切られた要素数を数える）
        // 仕様に従い、カンマ区切りの整数列として解釈し、空でない要素数を数える。
        // 例2のロジックを踏襲し、カンマを区切りとしてカウントするのではなく、有効な数値の数をカウントする。

        // 再度、よりシンプルに処理を再構成して、例2の意図（空でない語の数）と仕様（要素数と最大値）を満たすようにする。
        // カンマ区切りの整数列を読み、空でない整数要素の数を count とし、その最大値を max とする。

        count = 0;
        max = Long.MIN_VALUE;
        boolean isParsingNumber = false;
        long currentNumber = 0;

        // 再度入力全体を走査して、カンマで区切られた整数を抽出するロジックを採用する。
        // この問題は例2の「語」のカウントと似ているため、カンマをデリミタとして扱う。

        // 入力ストリーム全体を文字列として読み込み、分割するのが最も安全だが、ここではバイト配列処理を維持する。
        // 簡略化のため、入力全体を文字列に変換して処理する方が堅牢になるが、例の形式に従うため、バイト配列で再実装する。

        // カンマ区切りの整数列として解釈し、空でない要素数を数える。
        count = 0;
        max = Long.MIN_VALUE;
        boolean inNumber = false;
        long currentVal = 0;

        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    // カンマが見つかった場合、直前の数値が有効であればカウントし、リセットする。
                    if (inNumber) {
                        count++;
                        if (currentVal > max) {
                            max = currentVal;
                        }
                        currentVal = 0;
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数字を読み込む
                    currentVal = currentVal * 10 + (b - '0');
                    inNumber = true;
                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白は無視する。数値が途切れた場合、それは区切りとして扱われるべきだが、ここでは単に無視する。
                    inNumber = false;
                }
            }
        }

        // 最後の要素の処理（入力の終端でカンマがない場合）
        if (inNumber) {
            count++;
            if (currentVal > max) {
                max = currentVal;
            }
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
