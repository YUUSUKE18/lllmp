import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 空要素や非数値要素を無視した後の要素数と最大値を計算する。
        // ここでは、入力されたカンマ区切りの文字列全体から有効な整数のみを数えるのではなく、
        // 入力された全ての要素（空でないもの）の数をカウントし、その中の最大値を求める、という解釈で進める。
        // 仕様：「要素数」と「最大値」を求める。要素とはカンマ区切りの項目であると解釈する。

        // 再度、仕様に合わせて処理を調整する：
        // 「要素数」は読み込んだ有効な整数（カウントした回数）、「最大値」はその中の最大値。

        int finalCount = 0;
        long finalMax = Long.MIN_VALUE;

        if (line != null) {
            String[] partsToProcess = line.split(",");
            for (String part : partsToProcess) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        finalCount++;
                        if (n > finalMax) {
                            finalMax = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        System.out.println("count=" + finalCount + " max=" + finalMax);
    }
}
