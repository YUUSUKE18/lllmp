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
                    long num = 0;
                    for (int j = i; j < n; j++) {
                        int currentByte = buf[j] & 0xff;
                        if (currentByte >= '0' && currentByte <= '9') {
                            num = num * 10 + (currentByte - '0');
                        } else {
                            break;
                        }
                    }

                    if (num > 0) {
                        if (!foundFirst || num > max) {
                            max = num;
                            foundFirst = true;
                        }
                    }
                }
            }
        }

        // 最後の要素の処理が必要な場合（カンマで終わっていない場合）
        // この問題の仕様では、入力が「カンマ区切りの整数列」であるため、
        // カンマで区切られた後の値のみを数えるべきだが、例示された動作に従い、
        // 実際のトークン数をカウントするロジックを再構築する。

        // 仕様に基づいた再実装：カンマで区切られた要素を数え、最大値を求める。
        count = 0;
        max = Long.MIN_VALUE;
        boolean firstElementFound = false;
        long currentNumber = 0;
        boolean readingNumber = false;

        // 入力全体を文字列として読み込み、カンマで分割する方が安全だが、バイト配列操作に限定する。
        // カンマ区切りの整数列の処理は、バッファ内の連続した数字とカンマを検出して行う必要がある。

        int i = 0;
        while (i < in.available()) {
            int b = in.read();
            if (b == -1) break; // EOF

            if (b == ',') {
                // カンマが見つかった場合、直前の数字を処理する。
                // このアプローチでは、入力ストリーム全体を一度に読み込む方が容易。
                // 例示されたコードの形式（バッファ全体を走査）に戻り、カンマで区切られたトークンを特定する。
            }
        }

        // 元の例に従い、バッファ内のデータを処理し、数字とカンマを分離してカウントするロジックを採用する。
        // 実際には標準入力が提供されるため、読み込みはストリームで行うのが適切。
        
        // 再度、例2の構造を参考に、トークン分割を試みる。（今回は1行出力に限定されているため、ストリーム全体を走査し、カンマを区切りとして扱う）

        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean isReadingNumber = false;
        long currentNum = 0;

        // 再度、入力全体を走査する（例2のロジックに似せる）
        i = 0;
        while (in.available() > 0) {
            int b = in.read();
            if (b == -1) break; // EOF

            if (b == ',') {
                // カンマは要素の区切り。数字が連続していたらそれは一つの要素。
                if (isReadingNumber) {
                    finalCount++;
                    if (currentNum > finalMax) {
                        finalMax = currentNum;
                    }
                    currentNum = 0;
                    isReadingNumber = false;
                }
            } else if (b >= '0' && b <= '9') {
                // 数字を読み込む
                currentNum = currentNum * 10 + (b - '0');
                isReadingNumber = true;
            }
        }

        // 最後の要素の処理
        if (isReadingNumber) {
            finalCount++;
            if (currentNum > finalMax) {
                finalMax = currentNum;
            }
        }


        System.out.println("count=" + finalCount + " max=" + finalMax);
    }
}
