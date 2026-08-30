import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        // 1行目を読み込む
        try {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                // 最初の行が空の場合は終了
                return;
            }
            int expectedCount = Integer.parseInt(line.trim());

            long sum = 0;
            int actualCount = 0;

            // 2行目以降を読み込む
            while ((line = br.readLine()) != null) {
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    continue; // 空行は無視
                }

                try {
                    // 整数として解釈を試みる
                    long number = Long.parseLong(trimmedLine);
                    sum += number;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }

            // 結果を出力
            System.out.println("count=" + actualCount + " sum=" + sum);

        } catch (IOException e) {
            // 入力エラーが発生した場合
            // この問題の制約から、通常は発生しないが、堅牢性のために考慮
		} catch (NumberFormatException e) {
            // 1行目の値が整数でない場合など、予期せぬ形式のエラー
		}
    }
}
