import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        try {
            // 1行目を読み取り、続く整数の個数を取得
            String line1 = br.readLine();
            if (line1 == null || line1.trim().isEmpty()) {
                // 1行目が空の場合は終了
                System.out.println("count=0 sum=0");
                return;
            }
            int expectedCount = Integer.parseInt(line1.trim());
            
            List<Long> numbers = new ArrayList<>();
            long sum = 0;
            int actualReadCount = 0;

            // 2行目以降を読み取り、整数を収集
            String line;
            while ((line = br.readLine()) != null) {
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    continue; // 空行は無視
                }
                try {
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                    sum += number;
                    actualReadCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }

            // 仕様に従い、実際に読み取れた個数と合計を出力
            System.out.println("count=" + actualReadCount + " sum=" + sum);

        } catch (IOException e) {
            // 入力エラーが発生した場合（通常は競技プログラミング環境では発生しにくいが念のため）
            // この問題の仕様では、エラー時の出力形式は指定されていないため、ここでは何もしないか、
            // 実行環境に依存するが、ここでは処理を終了する。
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合など、予期せぬフォーマットエラー
        }
    }
}
