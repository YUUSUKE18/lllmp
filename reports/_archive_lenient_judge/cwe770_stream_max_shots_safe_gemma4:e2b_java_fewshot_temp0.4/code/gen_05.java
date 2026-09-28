import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        int c = 0;
        boolean inNumber = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inNumber) {
                        count++;
                        if (!foundFirst || (c == 1 && count == 1)) { // 最初の要素が読み込まれたか、または一つ目の要素としてカウントされた場合
                            // ここではカンマ区切りの整数列を処理するため、ここでは単純に数値を処理するフェーズに入る
                        }
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    long num = 0;
                    for (int j = i; j < c; j++) {
                        int currentByte = buf[j] & 0xff;
                        num = num * 10 + (currentByte - '0');
                    }

                    if (inNumber) {
                        if (!foundFirst || num > max) {
                            max = num;
                        }
                    }
                    inNumber = true;
                }
            }
        }

        // 最後の要素がカンマで終わっていない場合を考慮（入力の終端処理）
        // この実装では、カンマ区切りの整数列として読み取るため、よりロバストなトークン化が必要です。
        // 再度、標準的なトークン化アプローチを採用します。

        // トークンベースでの再実装
        String line = new String(buf, 0, c);
        if (line.contains(",")) {
            String[] tokens = line.split(",");
            long actualCount = 0;
            long actualMax = Long.MIN_VALUE;

            for (String token : tokens) {
                // 空文字列や空白を無視
                if (!token.trim().isEmpty()) {
                    try {
                        long num = Long.parseLong(token.trim());
                        actualCount++;
                        if (num > actualMax) {
                            actualMax = num;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }

            System.out.println("count=" + actualCount + " max=" + actualMax);
        } else if (!line.trim().isEmpty()) {
             // カンマなしの場合（単一の数値または複数の連続した数値）
             try {
                 long num = Long.parseLong(line.trim());
                 System.out.println("count=1 max=" + num);
             } catch (NumberFormatException e) {
                 // 数値でない場合は無視
             }
        } else {
            // 入力が空の場合
            System.out.println("count=0 max=" + Long.MIN_VALUE); // または仕様に従って適切なデフォルト値を設定
        }
    }
}
