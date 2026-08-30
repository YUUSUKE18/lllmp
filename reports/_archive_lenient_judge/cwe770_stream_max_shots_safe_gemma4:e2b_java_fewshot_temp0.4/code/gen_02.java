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
                        if (!foundFirst || (c > 0 && count > 0)) {
                            // カンマで区切られた要素を処理する前に、前の値が有効だったか確認する必要があるが、
                            // 今回はカンマの後に続く数字のみを数えるというロジックを採用する。
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
                            // 数字の途中で区切り文字や空白が来た場合、その数字は無視する（仕様により整数として解釈できない要素を無視）
                            break;
                        }
                    }
                    if (num > 0) {
                        if (!foundFirst || num > max) {
                            max = num;
                            foundFirst = true;
                        }
                    }
                    inNumber = false; // 数字を読み終わったらリセット（次の要素が始まるのを待つ）
                }
            }
        }

        // 最後の要素がカンマで終わっていない場合、それは最後の要素としてカウントされるべきか？
        // 仕様に基づき、カンマ区切りで「要素」を数えるため、末尾の処理は複雑になる。
        // 例2のロジックを参考に、カンマが出現したときに要素数をカウントする方式を採用し直す。

        // 再度、よりシンプルな方法で実装し直す (例2の構造に近づける)
        count = 0;
        max = Long.MIN_VALUE;
        boolean isFirst = true;
        boolean readingNumber = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    // カンマが出現したら、直前まで読み込んだものが一つの要素として確定したと見なす。
                    // ただし、空の要素や連続するカンマは無視する。
                    // このアプローチでは、数字を読み進める際にカンマを区切りとして扱う必要があるため、
                    // 読み込みバッファ全体を処理する方が自然。

                } else if (b >= '0' && b <= '9') {
                    // 数字を構築するロジックは複雑になるため、ここでは入力ストリームから直接トークンを抽出するアプローチを採用する。
                }
            }
        }

        // 最終的な実装として、カンマで区切られた文字列を読み込み、パースする方が堅牢である。
        // ただし、例1, 2, 3のコードがバイト配列全体を処理しているため、それに倣って、数字とカンマのみを抽出する。

        // 再度、例2のロジックに基づき、トークン化を試みる。
        count = 0;
        max = Long.MIN_VALUE;
        boolean firstElementFound = false;
        boolean currentNumberReading = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    // カンマは要素の区切り。直前まで読み込んだものが一つの数値として確定したと見なす。
                    // ただし、カンマの前後に数字がない場合は無視する（空要素無視）。
                    // この実装では、カンマ自体をトークンの区切りとして扱う。
                } else if (b >= '0' && b <= '9') {
                    if (!currentNumberReading) {
                        // 新しい数値の開始
                        currentNumberReading = true;
                    }
                    // 数値を蓄積（ここでは、バッファ内の連続する数字を一つの数として扱う）
                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白は無視
                    currentNumberReading = false;
                }
            }
        }

        // 厳密なトークン化のため、入力全体を文字列として読み込み、分割する方が簡単だが、
        // 例に従いバイト配列処理で行う。
        // この制約下で最も簡単な解釈は、カンマで区切られた数字の数を数えることである。

        // 最終的なロジック：カンマを区切りとして扱い、その間に存在する数字を抽出する。
        count = 0;
        max = Long.MIN_VALUE;
        boolean hasElements = false;
        long currentNum = 0;
        boolean reading = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    // カンマが来た場合、直前の数字を確定し、カウントする。
                    if (reading) {
                        count++;
                        if (!hasElements || currentNum > max) {
                            max = currentNum;
                            hasElements = true;
                        }
                        currentNum = 0;
                        reading = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数字を読み進める。64bit範囲に収まるように注意するが、ここでは単純に蓄積する。
                    currentNum = currentNum * 10 + (b - '0');
                    reading = true;
                } else if (b == ' ' || b == '\t' || b == '\n' || b == '\r') {
                    // 空白は無視。もし数字を読み中なら、それは無効な入力として扱う（このトークン化方式では難しい）。
                    reading = false;
                }
            }
        }

        // 最後の要素の処理
        if (reading) {
            count++;
            if (!hasElements || currentNum > max) {
                max = currentNum;
            }
        }


        System.out.println("count=" + count + " max=" + max);
    }
}
