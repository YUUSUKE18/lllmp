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

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視し、整数として解釈できるか確認
            try {
                // trim()で前後の空白を除去
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > maxVal) {
                        maxVal = value;
                    }
                    foundNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 数値が見つからなかった場合の処理（空の入力や全て無効な入力の場合）
        if (!foundNumber) {
            System.out.println("count=0 max=-1"); // 0個、最大値は未定義として-1
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
