import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、期待される整数個数を取得
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取ったものを無視するか、0として扱う。
            // 仕様に基づき、読み取れた整数のみを対象とするため、ここで処理を終了するか、
            // 続く行を読み続けるか判断が必要だが、ここでは2行目以降を読み続けることを優先する。
            // 念のため、もし1行目が読み取れなければ、以降の入力を無視する。
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int actualCount = 0;

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            try {
                long number = Long.parseLong(trimmedLine);
                sum += number;
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 実際に読み取れた整数のみを対象とするため、
        // 読み取れた実際の個数と合計を出力する
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
