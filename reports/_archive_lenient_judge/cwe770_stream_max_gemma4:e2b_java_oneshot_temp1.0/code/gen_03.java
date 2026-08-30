import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 要素がない場合の処理（最大値の定義を考慮して-1など）
            return;
        }

        // カンマで分割し、各要素を整数に変換する
        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                long number = Long.parseLong(trimmedPart);
                count++;
                if (number > maxValue) {
                    maxValue = number;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 整数が見つからなかった場合、count=0 max=? となるが、ここでは読み込んだ有効な数の情報に基づいて出力する。
        // 問題の仕様上、カンマ区切りの"整数列"を受け取るため、有効な整数を数える。
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つもなかった場合（入力が空または非数値のみの場合）、個数0、最大値は定義できないため適切な値を設定する。
            // 64bit整数の範囲内で、入力された要素数が0であることを示すために count=0, max=0 などとすることが多いが、ここでは読み込んだ有効な数に基づいて扱う。
            // 入力に数値がない場合は、カウントも最大値も0としておくのが安全かもしれない。
            System.out.println("count=0 max=-1"); // 厳密には「整数列」なので、空なら 0個。最大値は定義されないため、ここでは-1とするか、仕様で定めがあればそれに従う。
        }
    }
}
