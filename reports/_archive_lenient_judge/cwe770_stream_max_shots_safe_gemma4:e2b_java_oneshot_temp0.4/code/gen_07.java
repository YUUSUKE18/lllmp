import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE;

        while (st.hasMoreTokens()) {
            try {
                long value = Long.parseLong(st.nextToken());
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
            } catch (NumberFormatException e) {
                // 無効なトークンは無視する（仕様に従う）
			}
        }

        // 要素が一つもなかった場合、最大値は0とするか、または初期値のままにする。
        // 空要素や非整数を無視するため、countとmaxValを計算した結果を出力する。
        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
