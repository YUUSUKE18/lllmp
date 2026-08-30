import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        // 1行目を読み取り、続く整数の個数を取得
        try {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                // 入力が空の場合は終了
                return;
            }
            int expectedCount = Integer.parseInt(line.trim());

            long sum = 0;
            int actualCount = 0;

            // 2行目以降を読み取り、整数を処理
            while ((line = br.readLine()) != null) {
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    continue; // 空行は無視
                }

                try {
                    // 整数として解釈できるか試みる
                    long number = Long.parseLong(trimmedLine);
                    
                    // 読み取れた整数を対象とする
                    sum += number;
                    actualCount++;

                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }

            // 厳密に指定された形式で結果を出力
            System.out.println("count=" + actualCount + " sum=" + sum);

        } catch (IOException e) {
            // 入力中にエラーが発生した場合 (通常は問題の仕様外だが念のため)
            // この問題の制約上、標準入力からの読み込みが途中で止まることは想定されないが、
            // 読み込みエラーが発生した場合は処理を終了する。
        } catch (NumberFormatException e) {
            // 1行目の値が有効な整数でなかった場合 (これも想定外だが)
        }
    }
}
