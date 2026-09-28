import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは0個、最大値は未定義として-1とする
            return;
        }

        // カンマで分割し、空白を無視して整数を抽出する
        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(trimmedPart);
                count++;
                if (number > max) {
                    max = number;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合の処理。仕様上、空のリストの場合を考慮する必要がある。
            // 要素数0、最大値は未定義だが、ここではcount=0, max=-1（または最小値）とする。
            System.out.println("count=0 max=-1"); 
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
