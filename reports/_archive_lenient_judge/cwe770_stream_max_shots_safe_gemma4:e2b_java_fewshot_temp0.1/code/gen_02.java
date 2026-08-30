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

        // 最後の要素の処理（カンマで終わらない場合）
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

        // 再度、よりシンプルな方法で再実装（例2の意図に合わせる）
        count = 0;
        max = Long.MIN_VALUE;
        boolean isFirst = true;

        // 入力を文字列として読み込み、カンマで分割する方が安全だが、バイト配列処理を維持する。
        // 今回は例2のロジック（区切り文字を数える）を参考にしつつ、整数列として解釈する。

        // 簡略化のため、入力全体を文字列として扱い、splitで処理するアプローチを採用する。（バイト配列での複雑な状態管理を避けるため）
        // ただし、例1, 2, 3の形式に合わせるため、ここでは元のバイト配列読み取りロジックを尊重しつつ、整数列として解釈する。

        // 再度、入力全体をカンマで区切られたトークンとして処理する（より堅牢な方法）
        String input = new String(buf);
        String[] tokens = input.split("[\\s,]+"); // 空白やカンマで分割

        for (String token : tokens) {
            if (!token.isEmpty()) {
                try {
                    long val = Long.parseLong(token);
                    count++;
                    if (val > max) {
                        max = val;
                    }
                } catch (NumberFormatException e) {
                    // 数値として解釈できないものは無視
                }
            }
        }

        // 最終的な出力
        System.out.println("count=" + count + " max=" + max);
    }
}
