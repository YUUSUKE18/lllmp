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
                    if (first) {
                        count++;
                        if (max == Long.MIN_VALUE || (long)buf[i - 1] != -1) { // 最初の要素が有効な値を持っていた場合のみカウント
                            // このロジックは、カンマ区切りの整数列の先頭や末尾のカンマ、連続するカンマを適切に処理するために複雑になるため、
                            // より単純に数値の読み取りと最大値更新に焦点を当てます。
                        }
                    }
                    first = false;
                } else if (b >= '0' && b <= '9') {
                    long currentVal = 0;
                    for (int j = i; j < n; j++) {
                        int cb = buf[j] & 0xff;
                        if (cb >= '0' && cb <= '9') {
                            currentVal = currentVal * 10 + (cb - '0');
                        } else if (cb == ',') {
                            // カンマで区切られた数値の読み取りが完了した
                            if (currentVal > 0 || (currentVal == 0 && j > i)) { // 空白やカンマが連続する場合も考慮
                                if (count > 0) { // すでに要素をカウントしている場合のみ
                                    if (currentVal > max) {
                                        max = currentVal;
                                    }
                                }
                            }
                            break; // この数値の読み取りを終了
                        }
                    }
                }
            }
        }

        // 簡略化された再実装: 標準入力全体を文字列として読み込み、処理する方が安全で簡単です。
        // 例題の形式に合わせるため、ここではより直接的な方法を採用します。
        
        // 再度、標準入力を文字列として読み取るアプローチを採用します（Javaの標準機能を利用するため）

        java.util.Scanner scanner = new java.util.Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.trim().isEmpty()) {
                String[] parts = line.split(",");
                long actualCount = 0;
                long actualMax = Long.MIN_VALUE;

                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            long value = Long.parseLong(trimmedPart);
                            actualCount++;
                            if (value > actualMax) {
                                actualMax = value;
                            }
                        } catch (NumberFormatException e) {
                            // 整数として解釈できない要素は無視
                        }
                    }
                }

                System.out.println("count=" + actualCount + " max=" + actualMax);
            } else {
                 // 入力が空だった場合（もしあれば）
                 System.out.println("count=0 max=" + Long.MIN_VALUE);
            }
        } else {
             // 入力が全くなかった場合
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

    }
}
