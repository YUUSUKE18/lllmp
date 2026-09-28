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
        // 読み込んだデータ全体を文字列として扱い、カンマで分割する方が安全。
        
        // --- 再実装 ---
        
        // 標準入力全体を読み込む (例2と同様に)
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
        String line;
        StringBuilder content = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            content.append(line).append('\n');
        }

        // 読み込んだ内容をカンマで分割し、空でない整数を抽出する
        String[] parts = content.toString().trim().split(",");
        
        long actualCount = 0;
        long actualMax = Long.MIN_VALUE;
        boolean firstElementFound = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    actualCount++;
                    if (!firstElementFound || value > actualMax) {
                        actualMax = value;
                        firstElementFound = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (actualCount == 0) {
            // 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは最小値を採用する。
            // 問題文の例に従い、もし要素がなければ最大値は意味を持たないが、Long.MIN_VALUEをそのまま出力する。
            actualMax = Long.MIN_VALUE; 
        } else {
            // 最初の要素が見つかった場合のみ、maxを更新する（初期値がLong.MIN_VALUEのため）
            if (!firstElementFound) {
                // これは通常発生しないはずだが、念のため
                actualMax = Long.MIN_VALUE; 
            }
        }

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
