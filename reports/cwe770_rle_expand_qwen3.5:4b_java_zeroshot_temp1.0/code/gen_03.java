import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            Pattern pattern = Pattern.compile("(-?[0-9]+):([0-9]+)");
            Matcher matcher = pattern.matcher(input);

            long sum = 0;
            while (matcher.find()) {
                long value = Long.parseLong(matcher.group(1));
                long count = Long.parseLong(matcher.group(2));
                sum += value * count;
            }
            
            System.out.println("count=" + matcher.count() + " sum=" + sum);
        }
    }
}
