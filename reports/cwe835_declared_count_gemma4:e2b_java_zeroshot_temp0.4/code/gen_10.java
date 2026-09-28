import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込む
        String line1 = "";
        try {
            line1 = br.readLine();
        } catch (IOException e) {
            // 入力エラーが発生した場合、処理を終了
            return;
        }

        if (line1 == null || line1.trim().isEmpty()) {
            // 1行目が空の場合は終了
            return;
        }

        int count = 0;
        try {
            // 1行目の値を整数として読み取る
            count = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、何も処理しない（仕様上、これは想定外だが安全策）
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は無視
                continue;
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(trimmedLine);
                
                // 読み取れた整数を対象とする
                sum += number;
                actualCount++;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
