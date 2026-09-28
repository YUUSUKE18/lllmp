import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long sum = 0;

        for (String part : parts) {
            // "値:回数" の形式にマッチさせる
            Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
            Matcher matcher = pattern.matcher(part.trim());

            if (matcher.matches()) {
                try {
                    int value = Integer.parseInt(matcher.group(1));
                    int countInt = Integer.parseInt(matcher.group(2));
                    
                    // 値:回数に対応する整数列を生成し、合計と要素数を計算
                    for (int i = 0; i < countInt; i++) {
                        sum += value;
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
