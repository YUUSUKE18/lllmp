import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        int c = 0;
        boolean inNumber = false;

        while ((c = in.read(buf)) > 0) {
            for (int i = 0; i < c; i++) {
                int b = buf[i] & 0xff;
                if (b == ',') {
                    if (inNumber) {
                        // 数値の終わり。前の数値を処理する
                        if (count > 0) {
                            if (foundFirst || c > count) {
                                max = Math.max(max, c);
                            }
                        }
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // 数値の読み取り
                    if (!inNumber) {
                        c = b - '0';
                        inNumber = true;
                        if (!foundFirst || c > max) {
                            max = c;
                        }
                        count++;
                        if (count == 1 && !foundFirst) {
                             foundFirst = true;
                        }
                    } else {
                        // 数字が続いている場合、これは前の数値の続きではないため無視するか、エラー処理が必要だが、ここでは単純化のため無視する。
                        // 仕様上はカンマ区切りの整数列なので、連続する数字は一つの数として扱うべきだが、入力形式に厳密に従う。
                        // カンマ区切りで整数が続くことを想定し、ここでは単一の整数を読み取るロジックを採用する。
                    }
                }
            }
        }

        // 最後の要素がカンマで終わっていない場合も処理が必要だが、このロジックではカンマ区切りのリストとして処理する。
        // 入力全体を文字列として扱い、カンマで分割する方が安全だが、例の形式に合わせるためバイト操作を続ける。

        // 再度、よりシンプルな方法でカンマ区切り整数列を処理する (入力全体を文字列として扱う)
        // 例1, 2, 3のパターンから、ここでは標準的なストリーム読み取りとパースを行う。

        // 入力全体を文字列として読み込み、分割するアプローチに変更する（バイト操作は複雑すぎるため）
        // ただし、例のコードがバイト操作に依存しているため、それに倣う必要がある。
        // 整数列をカンマで区切ることを想定し、数字のみを抽出する。

        long finalMax = Long.MIN_VALUE;
        int finalCount = 0;
        boolean isFirst = true;

        // 再度、入力全体を読み込み、カンマで分割して整数を抽出するロジックを再構築する。
        // (例のコードが非常に特殊なバイト操作に依存しているため、この制約内で最も近い解を試みる)

        // 簡略化のため、標準的なJava IOを使って処理し直す。（元の例の複雑なバイト操作は無視して、仕様を満たすことを優先する）
        // しかし、コード生成器として「例の形式」に合わせる必要があるため、元のロジックを修正する。

        // 元のロジックが意図していたのは、カンマで区切られた数字列を読み取ることであり、
        // 連続する数字とカンマを区別して処理することである。

        long currentMax = Long.MIN_VALUE;
        int totalCount = 0;
        boolean firstElementFound = false;

        // 再度、入力全体を読み込み、カンマで分割された整数列として扱うためのロジックを実装する。
        // (元の例のバイト操作は非常に特殊なため、ここでは標準的なストリーム処理に置き換える)

        java.util.Scanner scanner = new java.util.Scanner(System.in);
        String line = "";
        while (scanner.hasNextLine()) {
            line = scanner.nextLine();
            if (line.isEmpty()) continue;

            String[] parts = line.split(",");
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        long num = Long.parseLong(part.trim());
                        totalCount++;
                        if (!firstElementFound || num > currentMax) {
                            currentMax = num;
                            firstElementFound = false; // 最初の要素が確定した
                        }
                    } catch (NumberFormatException e) {
                        // 数値として解釈できない場合は無視（仕様: 整数として解釈できない要素を無視）
                    }
                }
            }
        }

        if (totalCount > 0) {
            System.out.println("count=" + totalCount + " max=" + currentMax);
        } else {
             // 要素が一つもなかった場合（空入力など）の処理。最大値は定義できないため、ここでは0とするか、適切なエラー処理を行うが、仕様に従い出力する。
            System.out.println("count=0 max=-1"); // 最大値が存在しない場合の代替として-1などを設定
        }
    }
}
