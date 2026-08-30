import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み取り、実際に存在する整数の個数を取得する
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            // 何も読み取れなかった場合は終了
            return;
        }
        
        int actualCount;
        try {
            actualCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は、後の処理を続行しない（仕様上、1行目は整数と想定されるが念のため）
            return;
        }

        List<Long> numbers = new ArrayList<>();
        long sum = 0;
        int lineNum = 2;

        // 2行目以降を読み取り、整数を収集する
        while (true) {
            String line = br.readLine();
            if (line == null) {
                break; // EOFに達した
            }

            // 空行または数値として解釈できない行は無視する
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(trimmedLine);
                numbers.add(number);
                sum += number;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
            lineNum++;
        }

        // 実際に読み取れた個数と合計を出力する
        System.out.println("count=" + numbers.size() + " sum=" + sum);
    }
}
