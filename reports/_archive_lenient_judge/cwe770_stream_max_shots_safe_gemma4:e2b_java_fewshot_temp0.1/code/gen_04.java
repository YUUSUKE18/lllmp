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
        // このロジックは、入力が「数値,数値,...」という形式であり、末尾にカンマがないことを想定して調整が必要です。
        // 例2の動作を参考に、カンマ区切りの整数列として解釈します。

        // 再度、より堅牢な方法で処理します。ここでは、入力を文字列として読み込み、分割するのが最も簡単です。
        // ただし、例示されたコード形式に合わせるため、バイト配列からの直接パースを試みます。

        // 簡略化のため、入力全体を文字列として扱い、カンマで分割するアプローチを採用します。
        // 例2のロジックが「要素数」と「最大値」を求めることを意図しているため、その構造に合わせます。

        // 再度、例2の動作（カンマ区切り）を厳密に再現するように修正します。
        // 読み込んだデータ全体を文字列として扱い、カンマで分割して処理します。
        
        // 標準入力から全て読み込む
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(in));
        String line;
        StringBuilder content = new StringBuilder();

        while ((line = reader.readLine()) != null) {
            content.append(line).append('\n');
        }
        
        // 読み込んだ内容を処理（例2のロジックに近づける）
        String[] parts = content.toString().split(",");
        
        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long val = Long.parseLong(trimmedPart);
                    actualCount++;
                    if (val > actualMax) {
                        actualMax = val;
                    }
                } catch (NumberFormatException e) {
                    // 数値として解釈できない要素は無視
                }
            }
        }

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
