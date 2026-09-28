import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<Long> numbers = new ArrayList<>();

        try {
            // 1行目: 続く整数の個数 (ただし、実際に読み取れる個数と異なる可能性がある)
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                // 何も読み取れなければ終了
                System.out.println("count=0 sum=0");
                return;
            }
            // 1行目の値は無視し、2行目以降を読み取るため、ここでは単に次の行を読み始める
            // 仕様に従い、1行目の値を「期待される個数」として扱うが、実際に読み取った数で計算する
            // ここでは、1行目の値を個数の上限として使うのではなく、読み取れる行数を基準にする。
            // ただし、仕様は「実際に読み取れた整数だけを対象とします」とあるため、読み取れた数だけを扱う。

            String nextLine;
            while ((nextLine = br.readLine()) != null) {
                String trimmedLine = nextLine.trim();
                if (trimmedLine.isEmpty()) {
                    continue; // 空行は無視
                }
                try {
                    // 整数として解釈を試みる
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }
        } catch (IOException e) {
            // 入力エラーが発生した場合
            // エラーが発生しても、読み取れた情報に基づいて出力を試みる（このケースでは何も読み取れていない可能性が高い）
            System.out.println("count=0 sum=0");
            return;
        }

        // 実際に読み取れた数の個数と合計を計算
        long count = numbers.size();
        long sum = 0;
        for (long num : numbers) {
            sum += num;
        }

        // 結果の出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
