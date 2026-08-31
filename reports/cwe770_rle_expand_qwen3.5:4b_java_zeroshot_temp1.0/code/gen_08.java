import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;

        while (scanner.hasNext()) {
            String token = scanner.next();
            Pattern pattern = Pattern.compile("^(\\d+):(\\d+)$");
            Matcher matcher = pattern.matcher(token);
            
            if (matcher.matches()) {
                try {
                    long value = Long.parseLong(matcher.group(1));
                    long repeatCount = Long.parseLong(matcher.group(2));
                    
                    count += repeatCount;
                    sum += value * repeatCount;
                } catch (NumberFormatException e) {
                    // 数値変換に失敗した場合、無視する
                }
            } else {
                // パターンに合致しない要素は無視する
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
