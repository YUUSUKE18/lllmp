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
                // 整数として解釈できない要素は無視する（仕様通り）
			}
        }

        // 要素が一つもなかった場合や、全て無効な値だった場合の初期化処理を考慮し、
        // count=0, max=0 で出力する。ただし、入力された要素数と最大値を厳密に求めるため、
        // 読み取れた有効な要素数と最大値を出す。もし何も読み取れなかった場合は count=0, max=0 となる。

        if (count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
