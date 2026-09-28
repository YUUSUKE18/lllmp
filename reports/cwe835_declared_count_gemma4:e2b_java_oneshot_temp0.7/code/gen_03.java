import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、実際に読み取れた個数を取得する
        String countLine = br.readLine();
        int actualCount = 0;
        if (countLine != null) {
            try {
                actualCount = Integer.parseInt(countLine.trim());
            } catch (NumberFormatException e) {
                // 1行目が整数でない場合は0として扱う（仕様上は1行目に整数が入ると想定されるが安全策）
                actualCount = 0;
            }
        }

        long sum = 0;
        int readCount = 0;

        // 2行目以降を読み込み、整数を処理する
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                // 1行目に指定された個数と、実際に読み取れた個数を比較するロジックが必要だが、
                // 仕様「実際に読み取れた整数だけを対象とします」に基づき、読み取れた整数を全て集計する。
                // ただし、1行目の値が「実際に読み取れた個数」の基準となるため、
                // 1行目以降のデータは、読み取れた個数に制限されるべきか、あるいは全て読み取るべきか。
                // 仕様を再確認：「実際に読み取れた整数だけを対象とします。」
                // これは、1行目の値が読み取れた個数と一致しない場合、読み取れた数だけを扱うことを意味する。
                // したがって、1行目以降のデータは、読み取れた行数分だけ処理すれば良い。
                
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    long num = Long.parseLong(st.nextToken());
                    sum += num;
                    readCount++;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視 (仕様通り)
            }
        }

        // 実際に読み取れた個数と合計を出力
        System.out.println("count=" + readCount + " sum=" + sum);
    }
}
