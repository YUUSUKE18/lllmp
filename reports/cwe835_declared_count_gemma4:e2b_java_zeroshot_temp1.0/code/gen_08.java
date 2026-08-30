import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み込む
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            // 入力が空の場合は何もしない（またはエラー処理、ここでは終了）
            return;
        }

        int count = 0;
        try {
            count = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1行目が整数でない場合は無視
            return;
        }

        long sum = 0;
        int actualReadCount = 0;

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
                long num = Long.parseLong(trimmedLine);
                sum += num;
                actualReadCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 指定された個数と実際に読み取れた個数を比較する必要はない。
        // 仕様は「実際に読み取れた整数だけを対象とします」となっているため、
        // 読み取れた個数と合計を出力する。
        System.out.println("count=" + actualReadCount + " sum=" + sum);
    }
}
