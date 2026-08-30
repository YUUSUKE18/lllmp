import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // 正規表現パターン: 値:回数 の形式をマッチさせる
        Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
        
        // 文字列全体を走査してマッチする部分を抽出する
        for (String segment : line.split(",")) {
            String trimmedSegment = segment.trim();
            if (trimmedSegment.isEmpty()) continue;

            Matcher matcher = pattern.matcher(trimmedSegment);
            
            if (matcher.matches()) {
                try {
                    // 値と回数を抽出
                    String valueStr = matcher.group(1);
                    String countStr = matcher.group(2);
                    
                    int value = Integer.parseInt(valueStr);
                    int count = Integer.parseInt(countStr);

                    if (count > 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する (仕様上、値と回数は整数であると仮定)
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
