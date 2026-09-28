import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
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
                        int cb = buf[j] & 0xff;
                        if (cb >= '0' && cb <= '9') {
                            val = val * 10 + (cb - '0');
                        } else {
                            break;
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

        // 最後の要素がカンマで終わっていない場合を考慮する必要があるが、
        // この実装ではカンマの数をカウントするアプローチを取るため、
        // カンマ区切りの整数列として解釈し直す必要がある。
        // 仕様に従い、カンマ区切りの整数列を読み込むように修正する。

        // 再度、より適切なロジックで実装する（標準入力全体を文字列として扱い、パースする方が容易）

        // 標準入力を全て読み込む
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(in));
        String line;
        StringBuilder content = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            content.append(line).append('\n');
        }

        // 読み込んだ内容をカンマで分割し、整数としてパースする
        String[] parts = content.toString().trim().split(",");
        int actualCount = 0;
        long calculatedMax = Long.MIN_VALUE;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long val = Long.parseLong(trimmedPart);
                    actualCount++;
                    if (val > calculatedMax) {
                        calculatedMax = val;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（仕様に準拠）
                }
            }
        }

        System.out.println("count=" + actualCount + " max=" + calculatedMax);
    }
}
