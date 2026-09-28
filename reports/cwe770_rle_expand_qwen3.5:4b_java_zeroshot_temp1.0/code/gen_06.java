import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
        int start = 0;
        
        //カンマ区切りで分割し、各部分から数値を抽出する。
        while (start < line.length()) {
            String part = "";
            
            // 次の「:」の位置を探す（空文字または数字が開始していない場合を除く）
            int colonIndex = line.indexOf(':', start);
            if (colonIndex == -1) {
                // 形式を破った部分（値:回数が続いている部分の後など）があるか
                String afterColon = line.substring(colonIndex + 1).trim();
                if (!afterColon.isEmpty()) {
                    // 形が "A:B, ..." に似ているか？
                     for (int i = colonIndex + 1; i < line.length(); i++) {
                         part += Character.toString(line.charAt(i));
                     }
                 } 
            } else {
                part = line.substring(start, colonIndex).trim();
            }

            if (part.isEmpty() || !Pattern.matches("[0-9]+", part)) {
                continue; // 値:回数 形ではない無視する
            }

            String countStr = "";
            int colPos = part.indexOf(':');
            if (colPos != -1) {
                countStr = part.substring(0, colPos).trim();
                long value;
                try {
                    value = Long.parseLong(countStr);
                } catch (NumberFormatException e) {
                    continue; // 値が数字でない場合
                }

                String repeatStr = part.substring(colPos + 1);
                int count = 0;
                boolean invalid = true;
                
                // "次数:次数"の形式をチェック。
                if (repeatStr.startsWith(":")) {
                    try {
                        count = Long.parseLong(repeatStr.substring(1).trim());
                        invalid = false;
                    } catch (NumberFormatException e) {
                         continue;
                    }
                } else {
                    for (char c : repeatStr.toCharArray()) {
                        if (!Character.isDigit(c)) { break;} // 形式破り、無視またはスキップする
                        count *= 10 + (c - '0');
                    }
                }

                // 計算
                // 要素数 = 値 * 回数
                // 合計 = 値の累乗？No, 整数列を表すので単純に値*回数を足す。
                if (value != 0) {
                     // 64bit 範囲を確認する
                    long temp = value * count;
                    if (temp < 0 && value > 0 || temp > Long.MAX_VALUE) continue;

                    // ここでは「整数列を表す」と言われているので、単純に値*回数を累加する。
                    count += temp; 
                } else {
                   if (count != 0) {
                       sum += count; 
                   }
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
