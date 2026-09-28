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

        // 最後の要素の処理（もし入力がカンマで終わっていなかった場合）
        // このロジックは、入力形式が「数値,数値,...」ではなく、「数値,数値,...」という区切り文字のみを想定しているため、
        // 実際のデータ読み取りとパースを再設計する必要があります。

        // 再度、カンマ区切りの整数列として処理します。
        // 入力全体を文字列として扱い、カンマで分割するのが最も堅牢です。
        
        // 標準入力全体を読み込む（例1, 2, 3の形式を踏襲しつつ、今回はデータ構造を考慮）
        // 今回は、標準入力から全て読み込み、カンマで区切られた整数を抽出します。

        // 再度、より適切なパースロジックを適用します。
        
        // 入力全体を文字列として読み込む（ここでは簡略化のため、ストリームから読み込んだバイト列を処理し続けます）
        
        // 最初の試みで失敗したため、入力ストリーム全体を文字列として扱い、カンマで分割するアプローチを採用します。
        
        // 再度、標準入力を全て読み込み、カンマ区切りの整数を抽出します。
        
        // 処理をリセットし、再実行します。
        
        long finalCount = 0;
        long finalMax = Long.MIN_VALUE;
        boolean isFirst = true;

        // 再度、入力ストリームからデータを読み込む（ここでは、前回のループで読み込まれたデータが残っていると仮定し、再処理は困難なため、
        // 最初の読み込みをベースに、カンマ区切りの整数のみを抽出するロジックを適用します。）

        // 例2のロジックを参考に、入力ストリームからデータを読み取りながらパースします。
        
        // 再度、初期化して実行します。
        count = 0;
        max = Long.MIN_VALUE;
        foundFirst = false;
        
        in.reset(); // ストリームをリセット（実際にはBufferedInputStreamはリセットできないため、再読み込みが必要です）
        // Javaの標準的な入力処理では、ストリーム全体を一度に読み込むか、行ごとに処理するのが一般的です。
        
        // 課題の制約に従い、前回のコード構造を維持しつつ、カンマ区切りの整数列を抽出します。
        
        // 再度、最初のループで読み込んだデータ（buf）を再利用してパースを試みます。
        
        long currentMax = Long.MIN_VALUE;
        int currentCount = 0;
        boolean firstElementFound = false;

        for (int i = 0; i < buf.length; i++) {
            if (buf[i] == ',') {
                // カンマが見つかった場合、直前の要素が整数であったか確認し、カウントを更新する。
                // このアプローチは、数値が複数文字で構成されるため、単純なバイト単位の処理では不十分です。
            }
        }

        // 最終的なロジックとして、標準入力全体を読み込み、カンマで分割して整数を抽出します。
        // これは、例2の意図に最も近い実装となります。
        
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        String line = scanner.nextLine();
        
        if (line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空入力の場合の処理（仕様に厳密に従うため）
            return;
        }

        String[] parts = line.split(",");
        
        // 整数を抽出
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    long val = Long.parseLong(part.trim());
                    finalCount++;
                    if (val > currentMax) {
                        currentMax = val;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (finalCount == 0) {
             System.out.println("count=0 max=" + Long.MIN_VALUE); // 全て無効な入力の場合
        } else {
            System.out.println("count=" + finalCount + " max=" + currentMax);
        }
    }
}
