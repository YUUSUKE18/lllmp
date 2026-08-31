import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String input = sc.nextLine();
            Matcher matcher = Pattern.compile("(\\d+):(\\d+)").matcher(input);
            long count = 0;
            long sum = 0;
            while (matcher.find()) {
                int value = Integer.parseInt(matcher.group(1));
                int repeat = Integer.parseInt(matcher.group(2));
                if (repeat <= 0) continue;
                count += repeat;
                sum += (long) value * repeat;
            }
            System.out.println("count=" + count + " sum=" + sum);
        }
    }
}
