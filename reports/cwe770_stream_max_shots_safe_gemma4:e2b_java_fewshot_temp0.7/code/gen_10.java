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
                    long current = 0;
                    for (int j = i; j < n; j++) {
                        int next_b = buf[j] & 0xff;
                        if (next_b == ',') {
                            // 整数が終了した
                            if (current > Long.MIN_VALUE) {
                                if (!foundFirst || current > max) {
                                    max = current;
                                    foundFirst = true;
                                }
                            }
                            break;
                        } else if (next_b != ' ' && next_b != '\t' && next_b != '\n' && next_b != '\r') {
                            // 整数が続く
                            current = current * 10 + (next_b - '0');
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合などに対応）
        if (n > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;
                if (b >= '0' && b <= '9') {
                    long current = 0;
                    boolean isLast = (i == n - 1) || (buf[i+1] == ',' || i == n - 1); // 最後の要素か、次の文字がカンマか確認

                    // カンマ区切りの処理を再実装する方が安全だが、例の形式に倣うため、ここでは簡易的に処理を試みる
                    // 例題の構造に基づき、カンマ区切りで個数と最大値を求めるロジックを再構築する必要がある。
                }
            }
        }

        // 再度、より堅牢な方法（文字列として読み込む方が容易）を採用する。
        // 提示された例がバイト配列操作に依存しているため、その制約内で解く必要があるが、カンマ区切りの整数列を正しく扱うには、トークン化が必要になる。

        // ここでは、入力全体を文字列として扱い、標準的な解析を行うことを優先する。（もしバイト配列での厳密な実装が必須であれば、上記ロジックの修正が必要となる）
        // 仕様に従い、「カンマ区切りの整数列」を読み取るため、ここではよりシンプルな入出力処理を試みる。

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
                            // 整数として解釈できない要素は無視する（仕様通り）
                        }
                    }
                }
                System.out.println("count=" + actualCount + " max=" + actualMax);
            }
        }
    }
}
