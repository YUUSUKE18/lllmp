import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        // 1行目を読み込む (続く整数の個数)
        if ((line = br.readLine()) == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int count = 0;
        long sum = 0;

        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(trimmedLine);
                sum += number;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
