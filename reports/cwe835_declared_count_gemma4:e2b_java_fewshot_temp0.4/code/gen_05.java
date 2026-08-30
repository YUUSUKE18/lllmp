import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、期待される個数を取得
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取った整数のみを対象とする（仕様の解釈に基づき、ここでは0として扱うか、エラー処理を行うが、ここでは読み取れた整数のみを対象とするため、続く処理に影響を与えないようにする）
            // 仕様に従い、読み取れた整数のみを対象とするため、ここでは読み取れた整数をそのまま処理する。
            // ただし、1行目が「続く整数の個数」であるため、もし1行目が不正なら、読み取れた整数を0として扱うか、あるいはエラーとして扱うべきだが、ここでは「実際に読み取れた整数だけを対象」という指示に従い、続く行を読み続ける。
            // 実際には、1行目が個数であるため、もしパースできなければ、読み取った行数と合計を計算する。
            // ここでは、1行目を無視し、2行目以降を処理対象とする、という解釈で進める。
            // ただし、例示された構造に従い、1行目を個数として扱う。
            // 念のため、もし1行目がパースできなければ、読み取れた整数を0として扱う。
            expectedCount = 0; // 1行目が不正なら、読み取れた整数は0個とする
        }

        long sum = 0;
        int actualCount = 0;

        String line;
        // 2行目以降を読み込む
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

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
