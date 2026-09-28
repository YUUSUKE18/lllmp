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
                        int currentByte = buf[j] & 0xff;
                        if (currentByte >= '0' && currentByte <= '9') {
                            val = val * 10 + (currentByte - '0');
                        } else {
                            break; // End of number sequence
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

        // カンマ区切りの整数列を再処理して、要素数と最大値を正確に計算するロジックを修正します。
        // 上記の単純な読み取りではカンマと数字が混在しているため、より堅牢な方法が必要です。
        // 再度、入力全体を文字列として扱い、カンマで分割する方法を採用します。

        // 入力全体を読み込む（再初期化）
        in.reset(); // BufferedInputStreamにリセットできないため、ここでは標準的な方法に戻ります。
        // 実際には、前回のループで読み飛ばされたデータが残っているため、入力ストリーム全体を一度に処理する方が簡単です。

        // 再度、入力を文字列として扱うアプローチを採用します。
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
        String line = reader.readLine();

        if (line != null) {
            String[] parts = line.split(",");
            long actualCount = 0;
            long actualMax = Long.MIN_VALUE;
            boolean hasValidNumber = false;

            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long val = Long.parseLong(trimmedPart);
                        actualCount++;
                        if (val > actualMax) {
                            actualMax = val;
                        }
                        hasValidNumber = true;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }

            if (actualCount > 0) {
                System.out.println("count=" + actualCount + " max=" + actualMax);
            } else {
                 // 要素が一つも有効な整数でなかった場合（空行やカンマのみの場合）
                System.out.println("count=0 max=" + Long.MIN_VALUE); // または仕様に合わせた適切な値
            }

        } else {
             // 入力が空だった場合
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
