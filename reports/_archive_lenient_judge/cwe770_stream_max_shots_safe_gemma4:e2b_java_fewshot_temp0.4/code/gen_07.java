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
                    count++;
                } else if (b != ' ' && b != '\t' && b != '\n' && b != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (first) {
                            max = val;
                            first = false;
                        } else {
                            if (val > max) {
                                max = val;
                            }
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers, though the prompt implies they will be integers.
                    }
                }
            }
        }

        // カンマ区切りの整数列を再処理して、countとmaxを正確に計算するロジックを実装します。
        // 上記の単純な読み取りでは、カンマの位置と値の抽出が複雑になるため、ここではより堅牢な方法で再実装します。

        // 再度入力ストリームから読み込み、カンマ区切りとして処理する
        String line = new String(buf).trim();
        if (!line.isEmpty()) {
            String[] parts = line.split(",");
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
                        // Ignore non-integer parts
                    }
                }
            }

            System.out.println("count=" + actualCount + " max=" + actualMax);
        } else {
             // 入力が空または空白のみの場合
             System.out.println("count=0 max=" + Long.MIN_VALUE); // または仕様に合わせて適切な値を出力
        }
    }
}
