import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line;
        int expectedCount = 0;
        long sum = 0;
        int actualCount = 0;

        try {
            // 1行目を読み込み、期待される個数を取得
            line = br.readLine();
            if (line != null) {
                try {
                    expectedCount = Integer.parseInt(line.trim());
                } catch (NumberFormatException e) {
                    // 1行目が整数でない場合は処理を終了（または想定される動作に従う）
                    // ここでは読み取れた数がないと仮定し終了
                    // ただし、仕様に従うため、実際には次の行を読み続ける必要があるかもしれない。
                    // 今回は、1行目が不正なら何も読み取らないとする。
                    return; 
                }
            }

            // 2行目以降を読み込み、整数を処理
            while ((line = br.readLine()) != null) {
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    continue; // 空行は無視
                }

                try {
                    // 整数としてパースを試みる
                    long number = Long.parseLong(trimmedLine);
                    sum += number;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }

        } catch (IOException e) {
            // 入力エラーが発生した場合
            // この問題設定では通常、エラー処理は不要だが、念のため
        }

        // 最終結果を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
