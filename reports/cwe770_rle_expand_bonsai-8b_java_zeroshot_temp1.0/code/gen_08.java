import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] parts = input.trim().split(",");
        
        int count = 0, sum = 0;
        
        for (String part : parts) {
            Matcher matcher = Pattern.compile("([0-9]+):([0-9]+)");
            if (matcher.matcher(part).hasMatch()) {
                int value = Integer.parseInt(matcher.group(1));
                int repeat = Integer.parseInt(matcher.group(2));
                count += repeat;
                sum += value * repeat;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
