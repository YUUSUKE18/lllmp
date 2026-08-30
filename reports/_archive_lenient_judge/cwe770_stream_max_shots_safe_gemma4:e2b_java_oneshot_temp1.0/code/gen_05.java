import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは0個、最大値未設定として-1を仮定
            return;
        }

        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視し、整数として解釈できるか試みる
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedToken);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        // 数値が一つもなかった場合の処理（もし空行や非数値のみ入力された場合）
        if (!foundNumber) {
            System.out.println("count=0 max=-1"); // 該当する最大値は定義できないため、ここでは-1または0などとします。問題の制約がないため暫定的に-1とする。
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
