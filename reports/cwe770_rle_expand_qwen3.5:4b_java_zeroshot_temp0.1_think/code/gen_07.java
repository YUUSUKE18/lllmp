import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        while (sc.hasNext()) {
            sb.append(sc.next());
        }
        String input = sb.toString();

        long count = 0;
        long sum = 0;

        Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
        Matcher matcher = pattern.matcher(input);

        while (matcher.find()) {
            long val = Long.parseLong(matcher.group(1));
            long cnt = Long.parseLong(matcher.group(2));
            count += cnt;
            sum += val * cnt;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
