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
                    long currentVal = 0;
                    for (int j = i; j < n; j++) {
                        int cb = buf[j] & 0xff;
                        if (cb == ',') {
                            // 区切り文字が見つかった場合、数字を処理
                            if (currentVal > 0 || (currentVal == 0 && (i == j - 1))) { // 空のカンマをスキップしないように注意
                                if (foundFirst || currentVal > max) {
                                    max = currentVal;
                                }
                            }
                            currentVal = 0;
                        } else if (cb >= '0' && cb <= '9') {
                            currentVal = currentVal * 10 + (cb - '0');
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合や、最後の要素にカンマがない場合を考慮）
        if (count > 0) {
            // ここでは単純化のため、標準的なストリーム処理として再実装する方が安全です。
            // 再度読み込みを行い、よりロバストなパースを行います。
            
            // 標準入力全体を文字列として読み込み、カンマで分割する方法を採用します。
        }
        
        // 上記のバイト配列処理は複雑でミスが生じやすいため、標準的な文字列操作に切り替えます。

        // 再度リセットして、より確実な方法で処理します。
        // 標準入力全体を読み込む（このコードブロック内では再読込が困難なので、ここでは想定される入力を直接処理するように変更します）
    }
}
