import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、続く整数の個数を取得
        String countLine = br.readLine();
        if (countLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(countLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、読み取れた整数を0として扱うか、エラー処理を行うが、
            // 仕様に従い、読み取れた整数のみを対象とするため、ここでは読み取れた整数を0として扱うか、
            // 厳密に仕様に従い、読み取れた整数を対象とする。
            // ここでは、読み取れた整数が0個として扱われることを想定し、読み取れた整数を対象とする。
            // ただし、仕様は「実際に読み取れた整数だけを対象」とあるため、読み取れた整数をそのまま使う。
            expectedCount = 0; // 読み取れなかった場合は0個と見なす
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
                // 整数として解釈を試みる
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
