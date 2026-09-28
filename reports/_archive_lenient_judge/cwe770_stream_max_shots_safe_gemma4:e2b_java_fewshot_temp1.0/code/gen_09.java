import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        int c = 0;
        boolean readingNumber = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (readingNumber) {
                        if (c > 0) { // カンマの前に数字があった場合のみカウント
                            count++;
                            if (first || (long) c > max) {
                                max = c;
                            }
                            first = false;
                        }
                        readingNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数字を読み取る処理。ここでは、数字列全体を一度に扱うのではなく、カンマ区切りの整数を個別に抽出するアプローチを取る。
                    // 標準入力がカンマで区切られた整数列であるため、数字の塊を抽出する必要がある。

                    // 簡略化のため、読み込んだバイト列から連続する数字を見つけ出すロジックを採用する。
                    if (!readingNumber) {
                        long currentNum = 0;
                        int j = i;
                        while (j < c && buf[j] >= '0' && buf[j] <= '9') {
                            currentNum = currentNum * 10 + (buf[j] - '0');
                            j++;
                        }

                        if (readingNumber) { // 前のカンマと数字がセットになった場合、countを更新する（このロジックは複雑になるため、入力ストリーム全体を文字列として扱う方が実用的だが、例に倣う）
                            // 例の構造に合わせて、ここでは単純化し、カンマ区切りの整数リストとして処理する。

                            // ここでは、カンマ区切りで読み込むことを想定し、数字が連続する場合にそれを整数として扱う。
                            // ただし、元の例（例2）のロジックを参考に、区切り文字と非数値文字を区別して処理する。
                            // 今回は「カンマ区切りの整数列」なので、数字を読み進めることに注力する。

                            // カンマ区切りの入力の場合、空白や改行が区切りとして機能するため、ここではバッファ内の数字をすべて取り出す必要がある。
                        }
                    }
                }
            }
        }


        // 再度、例2の意図に合わせて、カンマで区切られた整数を抽出するロジックに修正する。
        // 標準入力全体を文字列として読み込み、分割するのが最も簡単だが、バイト配列操作のみで行う必要があるため、上記を調整する。

        // --- 最終的な実装方針: 入力を全て読み込み、カンマで区切って処理する (例2の意図に合わせる) ---
        // 64bit整数としての処理は`long`を使用し、入力バイト列から数字とカンマを識別する。
        
        // 再度、初期化し直して、読み込んだデータがカンマ区切りの整数リストとして解釈されるようにする。

        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean foundAny = false;
        boolean inNumber = false;
        long currentNumber = 0;
        int charIndex = 0;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inNumber) {
                        finalCount++;
                        if (currentNumber > finalMax) {
                            finalMax = currentNumber;
                        }
                        foundAny = true;
                        currentNumber = 0;
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数字を読み込む。long型として安全性を確保する。
                    currentNumber = currentNumber * 10 + (b - '0');
                    inNumber = true;
                }
            }
        }

        // 最後の数値を処理
        if (inNumber) {
            finalCount++;
            if (currentNumber > finalMax) {
                finalMax = currentNumber;
            }
            foundAny = true;
        }

        // 結果の出力
        if (foundAny) {
            System.out.println("count=" + finalCount + " max=" + finalMax);
        } else {
            // カンマ区切りの要素が一つもなかった場合（または全て無視された場合）の扱い。
            // 仕様に従い、何も見つからなかった場合の出力形式を定義しないため、ここでは最大値とカウントを出力する。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // または適切なデフォルト値を設定（例2では空要素数を返す）
        }
    }
}
