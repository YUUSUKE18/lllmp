import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean firstElement = true;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    // カンマが現れたら、直前の要素を処理する準備をする（ここでは個数をカウント）
                } else if (b >= '0' && b <= '9') {
                    long current = 0;
                    for (int j = i; j < n; j++) {
                        int next_b = buf[j] & 0xff;
                        if (next_b == ',') {
                            // カンマが見つかったら、読み込んだ数値を処理する
                            if (current > 0) {
                                count++;
                                if (current > max) {
                                    max = current;
                                }
                            }
                            current = 0; // リセット
                        } else if (next_b >= '0' && next_b <= '9') {
                            current = current * 10 + (next_b - '0');
                        }
                    }
                    // 最後の要素を処理する（カンマで終わる場合や、ブロックの終わり）
                    if (current > 0) {
                        count++;
                        if (current > max) {
                            max = current;
                        }
                    }
                }
            }
        }

        // 最後の要素を処理する（入力がカンマで終わる場合などに対応するため、上記ループの後の処理は複雑になるため、よりシンプルな方法で再実装）

        // 再度、カンマ区切りの整数列として処理するロジックを採用し直す
        String input = new String(buf).replace('\n', ' ').replace('\r', ' ');
        if (input.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        String[] parts = input.split(",");
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
                    // 数値として解釈できない要素は無視する（仕様通り）
                }
            }
        }

        System.out.println("count=" + actualCount + " max=" + actualMax);
    }
}
