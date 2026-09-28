import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // 正規表現で "値:回数" のペアを抽出する
        // パターン: (\d+):(\d+)
        Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
        Matcher matcher = pattern.matcher(line);

        while (matcher.find()) {
            try {
                int value = Integer.parseInt(matcher.group(1));
                int count = Integer.parseInt(matcher.group(2));

                if (count > 0) {
                    totalCount += count;
                    totalSum += (long) value * count;
                }
            } catch (NumberFormatException e) {
                // このケースは正規表現で数値であることを保証しているので通常発生しないはずだが念のため無視
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
