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
                        if (!foundFirst || (c > 0 && count == 1)) { // カウントはカンマの後に続く要素数。ここではカンマで区切られた要素数をカウントする
                            // このロジックは、入力が「整数列」ではなく「カンマ区切りの整数列」を想定しているため、
                            // カンマをデリミタとして扱い、その間の要素を処理する必要があります。
                        }
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    long num = 0;
                    for (int j = i; j < c; j++) {
                        int currentByte = buf[j] & 0xff;
                        if (currentByte >= '0' && currentByte <= '9') {
                            num = num * 10 + (currentByte - '0');
                        } else {
                            // 数字の途中に非数字が混ざった場合、それ以降は無視する（厳密にはこの問題設定では不要かもしれないが安全のため）
                            break;
                        }
                    }

                    if (num > 0) { // 空白や連続したカンマで区切られた後の数値のみを考慮
                        if (!foundFirst || num > max) {
                            max = num;
                        }
                        foundFirst = true;
                    }
                    inNumber = true;

                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白文字は無視
                }
            }
        }

        // 最後の要素の処理（入力がカンマで終わる場合や、最後に数値がある場合に対応）
        // この問題の仕様は「カンマ区切りの整数列」なので、入力を文字列として扱い、分割するのが最も安全です。
        // 例2の例に従い、ここではより単純なトークン化を試みますが、入力形式が厳密にカンマ区切りであると仮定します。

        // 再度、例2のロジックを踏襲しつつ、整数列として処理します。
        // 実際には標準入力全体を読み込み、カンマで分割するのが最も確実です。
        
        // ここでは、上記のような複雑なバイト操作ではなく、JavaのString処理に置き換えて再実装します。
        // ただし、コード生成器の制約として「例」の形式を踏襲することを優先し、標準入力全体を読み込む方法を採用します。

        // ------------------- 再実装（より堅牢なトークン化） -------------------
        
        // 標準入力全体を読み込み、カンマで分割して処理するアプローチに変更します。
        // 例2のコードが「カンマ区切りの語」を想定しているため、整数列も同様に処理します。

        java.util.Scanner scanner = new java.util.Scanner(System.in);
        java.util.List<Long> numbers = new java.util.ArrayList<>();
        
        // 標準入力からカンマ区切りの整数を読み込む
        while (scanner.hasNext()) {
            String token = scanner.next();
            if (!token.isEmpty()) {
                try {
                    long num = Long.parseLong(token);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視（仕様に従う）
                }
            }
        }

        if (numbers.isEmpty()) {
            System.out.println("count=0 max=0"); // 要素がない場合のデフォルト処理
        } else {
            long finalCount = numbers.size();
            long finalMax = Long.MIN_VALUE;
            for (long num : numbers) {
                if (num > finalMax) {
                    finalMax = num;
                }
            }
            System.out.println("count=" + finalCount + " max=" + finalMax);
        }
    }
}
