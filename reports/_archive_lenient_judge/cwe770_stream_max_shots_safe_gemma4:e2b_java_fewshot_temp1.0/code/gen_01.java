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
                        if (!String.isEmpty()) {
                            if (!foundFirst || val > max) {
                                max = val;
                                foundFirst = true;
                            }
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // 最後の要素の処理（もし入力がカンマで終わっていなかった場合に対応するため）
        // この問題の仕様では、カンマ区切りの整数列として読み取るため、ここでは
        // 区切り文字を基準にカウントする方式を採用し、後続の処理で最大値を決定します。

        // 再度ロジックを整理し、要素数を正確に数えるように修正します。
        // 整数とカンマのみを対象とする方が安全です。

        count = 0;
        max = Long.MIN_VALUE;
        boolean isFirstElement = true;

        // 標準入力全体を文字列として読み込み、カンマで分割する方がシンプルで堅牢です。
        // ただし、例の形式に合わせるため、バイト配列から直接処理を続行します。

        long currentNum = 0;
        boolean inNumber = false;

        for (int i = 0; i < buf.length; i++) {
            int b = buf[i] & 0xff;

            if (b == ',') {
                // カンマが見つかった場合、直前までが有効な数値の終わり。
                if (inNumber) {
                    count++;
                    if (!isFirstElement || currentNum > max) {
                        max = currentNum;
                    }
                    currentNum = 0;
                    inNumber = false;
                    isFirstElement = true; // 次の要素が最初の要素になる
                }
            } else if (b >= '0' && b <= '9') {
                // 数字を読み込む
                if (!inNumber) {
                    currentNum = 0;
                    inNumber = true;
                }
                currentNum = currentNum * 10 + (b - '0');
            }
        }

        // 最後の要素の処理
        if (inNumber) {
            count++;
            if (!isFirstElement || currentNum > max) {
                max = currentNum;
            }
        }


        // 注: 上記のロジックは、入力が「整数,整数,...」という形式で、数字間にカンマのみが存在し、
        // 数字以外の文字は無視するという仮定に基づいています。
        // 実際の課題の意図（例2との類似性）を考えると、ストリームからトークンを抽出する方が一般的ですが、
        // 例示されたコードの構造に従い、バッファ内で処理します。

        System.out.println("count=" + count + " max=" + max);
    }
}
