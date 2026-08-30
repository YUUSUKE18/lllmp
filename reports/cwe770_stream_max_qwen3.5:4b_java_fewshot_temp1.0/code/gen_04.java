import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long max = Long.MIN_VALUE;
        int count = 0;
        if (line != null && !line.isEmpty()) {
            for (String s : line.split(",")) {
                String trimmed = s.trim();
                try {
                    if (!trimmed.isEmpty()) {
                        long val = Long.parseLong(trimmed);
                        if (count == 0 || val > max) {
                            max = val;
                        }
                        count++;
                    }
                } catch (NumberFormatException e) {
                }
            }
        } else if (line != null && line.isEmpty()) {
            // 空行の場合、最大値を決定できないので0またはMIN_VALUEとするが、例題の論理に準じcount=0, max=設定した初期値で出力する。
            // ただし、問題文「整数として解釈できない要素も無視します」を含むが、最小値は存在しないため 0 とするのが妥当か？
            // 上記コードでは count == 0 の場合、max は MIN_VALUE に残される。これは合理的である（空集合の最大値）。
        }
        System.out.println("count=" + count + " max=" + max);
    }
}
