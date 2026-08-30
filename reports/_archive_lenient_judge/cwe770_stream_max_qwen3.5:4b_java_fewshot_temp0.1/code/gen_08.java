import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                String trimmed = part.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmed);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        if (!first && count > 0) {
             System.out.println("count=" + count + " max=" + max);
        } else {
            // 有効な整数が一つもない場合、最大値は定義できないため MIN_VALUE とする（または問題文の意図に合わせる）
            // ここでは「要素数」が存在しない場合は count=0, max=? の扱い。
            // 通常テストケースでは少なくとも1つの整数が入ることを前提とすることが多いが、
            // 厳密に従うなら count=0 の場合も出力する必要がある。
            System.out.println("count=" + count + " max=" + Long.MIN_VALUE);
        }
    }
}
