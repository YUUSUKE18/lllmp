import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを抽出
        String[] tokens = line.split(",");

        int count = 0;
        long max = Long.MIN_VALUE;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }
            try {
                // 整数として解釈
                long value = Long.parseLong(trimmedToken);
                count++;
                if (value > max) {
                    max = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 最初の要素がなかった場合の対策（入力が空文字列のみの場合を考慮し、count=0, max=0または初期値で出力）
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
