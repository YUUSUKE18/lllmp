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
                        if (!foundFirst) {
                            if (val > max) {
                                max = val;
                            }
                        } else if (val > max) {
                            max = val;
                        }
                        foundFirst = false; // 最初の要素が読み込まれたと見なす（ここでは最大値を求めるため、最初の要素を基準にする）
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // カンマ区切りの処理を再実装し、より正確にカウントと最大値を求める
        // 上記のロジックは複雑になるため、ここでは標準的なトークン化アプローチを採用します。

        // 再度読み込み、カンマで分割して処理する方が安全です。
        // ただし、入力全体を一度にメモリに読み込む前提なので、上記の方法を修正します。

        // 簡略化のため、入力ストリームから直接読み取り、トークン化を行います。
        // 今回は例題の形式を踏襲し、入力を文字列として処理する方が簡単ですが、
        // 例題の構造に従いバイト配列で処理を試みます。

        // 再度、カンマ区切りの整数列を抽出してカウントと最大値を求めるロジックを再構築します。
        
        long currentCount = 0;
        long currentMax = Long.MIN_VALUE;
        boolean inNumber = false;
        boolean firstElement = true;

        // 入力全体を文字列として読み込む方が、カンマ区切り処理には適しているため、
        // ここではバイト配列から文字列に変換して処理します。
        StringBuilder input = new StringBuilder();
        int totalRead = 0;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                char c = (char) (buf[i] & 0xff);
                input.append(c);
            }
        }
        String fullInput = input.toString();

        // カンマで分割して処理
        String[] tokens = fullInput.split(",");
        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedToken);
                    actualCount++;
                    if (value > actualMax) {
                        actualMax = value;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できないものは無視
                }
            }
        }

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
