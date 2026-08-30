import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    // カンマで区切られた要素の終わり。もし要素を読み取っていたらカウントし、更新する。
                    // このロジックは少し複雑になるため、ここではカンマが数字の後に続くことを利用して処理する。
                    // より単純に、空白や改行を区切りとして扱い、整数値を直接パースするアプローチに変更する方が安全。
                } else if (b >= '0' && b <= '9') {
                    // 数字を読み取っている途中。これまでの数字を組み立てる。
                    long currentNum = 0;
                    int j = i;
                    while (j < n && buf[j] >= '0' && buf[j] <= '9') {
                        currentNum = currentNum * 10 + (buf[j] - '0');
                        j++;
                    }
                    // 数字の塊が終わり、次の文字がカンマや空白などでないことを確認する必要があるが、ここでは単純化して処理する。

                    // 実際の入力形式は「カンマ区切りの整数列」なので、スペースなども無視し、数字を抽出する方式を採用する。
                    // 再度、入力全体を文字列として扱い、分割する方が実装が容易になることが多い。
                }
            }
        }
        
        // 入力全体を読み込み、カンマで分割して処理するよりシンプルな方法に修正します。
        // 例2の構造を踏襲し、入力をすべて読み込んでからパースします。

        // 実際の入力は通常行単位または単一ストリームとして提供されるため、ここでは標準的なトークン化を試みます。
        // 標準入力全体を文字列として読み込むことを想定する (BufferedInputStreamからの読み取り)。
        // 例1, 2, 3の例では、実質的にバイト列をそのまま処理している。
        
        // カンマ区切りの整数列を直接パースするロジックに特化させるため、一度文字列として読み込む方法を採用します。

        // 再度、入力全体を文字列で受け取るためのロジックに修正します。（例2のようなもの）
        
        StringBuilder input = new StringBuilder();
        byte[] tempBuf = new byte[1024]; // 十分なバッファサイズ
        int bytesRead;
        
        while ((bytesRead = in.read(tempBuf)) != -1) {
            for (int i = 0; i < bytesRead; i++) {
                char c = (char) tempBuf[i];
                if (c == '\n' || c == '\r') {
                    // 改行は無視して続行（ただし、ここでは単一の大きな入力を想定）
                    continue;
                }
                input.append(c);
            }
        }

        String inputStr = input.toString();
        
        // カンマで分割し、各要素を処理する
        String[] tokens = inputStr.split(",");

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedToken);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        // 空のトークンや空白は既に無視されているため、countとmaxを出力
        System.out.println("count=" + count + " max=" + max);
    }
}
