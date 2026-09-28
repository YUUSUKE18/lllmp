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

        // 最後の要素を処理する必要がある場合（入力がカンマで終わらない場合）
        // このロジックは、入力が「整数,整数,...」の形式であり、最後にカンマがないことを想定して調整が必要です。
        // 例2の動作を踏まえると、ここではカンマの数ではなく、有効な整数の数を数える必要があります。

        // 再度、よりシンプルに処理を試みます。カンマ区切りの整数列として読み込みます。
        // 実際に入力全体を文字列として扱い、分割するのが最も堅牢です。
        
        // 例2のロジックを参考に、入力ストリームからデータを読み取り、カンマで区切られた数値を抽出します。

        // 再実装: 入力を文字列として読み込み、分割する方が簡単かつ正確です。
        
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
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
                        // 無効な整数は無視
                    }
                }
            }

            System.out.println("count=" + actualCount + " max=" + actualMax);
        } else {
             // 入力が空の場合
             System.out.println("count=0 max=" + Long.MIN_VALUE); // または仕様に合わせた適切な値
        }
    }
}
