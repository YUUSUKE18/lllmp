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
                        max = Long.parseLong(String.valueOf(buf[i - 1]));
                        first = false;
                    } else if (buf[i - 1] != ',') {
                        long val = Long.parseLong(String.valueOf(buf[i - 1]));
                        if (val > max) {
                            max = val;
                        }
                    }
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合や、行末の場合に対応するため）
        // このロジックは例示された例との構造を模倣しつつ、カンマ区切りの整数列を処理する必要があります。
        // より堅牢な方法として、文字列として読み込み、分割する方法を採用します。

        // 再度処理（よりシンプルな文字列ベースの処理）
        // 標準入力全体を読み込むことを前提とし、ここでは入力を一度全て読み込んだと仮定して処理を再構成します。
    }
}
