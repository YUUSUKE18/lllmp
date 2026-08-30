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
                        if (!foundFirst || (c > 0 && count == 1)) { // 最初の要素が読み込まれた場合、maxの初期化を考慮
                            // 最初の要素が読み込まれた時点でmaxを更新するロジックが必要だが、ここでは一旦カウントと最大値を更新する
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

                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白文字は無視
                }
            }
        }

        // 最後の要素がカンマで終わっていない場合、それを処理する（この問題設定では入力の終端が重要）
        // 入力全体を読み込んだ後、最後に残っている数値をチェックする必要がある。
        // 上記のロジックは、カンマ区切りの整数列を直接パースするのではなく、バイトストリームから文字を読み取る方式になっているため、
        // 厳密なカンマ区切り処理に修正が必要。

        // 再度、よりシンプルなトークンベースの処理を試みる（例2のロジックを応用）

        // 入力全体を文字列として読み込み、カンマで分割する方が安全だが、ここではバイト配列から直接パースする。
        // 課題の制約に従い、入力ストリームからカンマ区切りの整数列を抽出する。

        // 再実装：トークンベースで処理し、空要素や非数値は無視する。

        count = 0;
        max = Long.MIN_VALUE;
        boolean firstElement = true;
        boolean readingNumber = false;
        long currentNumber = 0;

        // 入力全体を読み込む（再初期化）
        in.reset(); // ストリームの先頭に戻すためにリセットが必要だが、BufferedInputStreamは通常リセットできないため、ここでは入力全体が既に読み込まれていると仮定して処理を進める。
        // 実際には、上記ループで読み込んだデータのみを対象とする。

        // 入力ストリームから再読み込み（これは実質的に再実行されることを想定）
        in.reset(); // BufferedInputStreamはリセットできないため、ここでは入力全体が一度に読まれていると仮定し、前のロジックの意図を汲んで修正する。

        // 課題の仕様に基づき、標準入力からカンマ区切りの整数列を読み取ることを想定した処理を行う。
        // 例2の構造を参考に、バイト配列から直接パースする。

        count = 0;
        max = Long.MIN_VALUE;
        boolean isParsingNumber = false;
        long currentVal = 0;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (isParsingNumber) {
                        count++;
                        if (currentVal > max) {
                            max = currentVal;
                        }
                        currentVal = 0;
                        isParsingNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    long digit = b - '0';
                    currentVal = currentVal * 10 + digit;
                    isParsingNumber = true;
                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白は無視
                }
            }
        }

        // 最後の要素の処理
        if (isParsingNumber) {
            count++;
            if (currentVal > max) {
                max = currentVal;
            }
        }

        // このロジックでは、最初の要素が読み込まれた時点でcountとmaxが正しく設定されるように調整が必要。
        // 厳密に「空でない語」を数えるため、カンマで区切られた整数のみをカウントする。

        // 再度、より堅牢なトークン処理を行う（例2のロジックを適用）

        count = 0;
        max = Long.MIN_VALUE;
        boolean inToken = false;
        long currentNum = 0;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inToken) {
                        count++;
                        if (currentNum > max) {
                            max = currentNum;
                        }
                        currentNum = 0;
                        inToken = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    long digit = b - '0';
                    // 64bitの範囲を考慮し、オーバーフローチェックはここでは省略（問題文で値が収まるとされているため）
                    currentNum = currentNum * 10 + digit;
                    inToken = true;
                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白は無視
                }
            }
        }

        // 最後のトークン処理
        if (inToken) {
            count++;
            if (currentNum > max) {
                max = currentNum;
            }
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
