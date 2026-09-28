import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        Matcher matcher = Pattern.compile("([0-9]+):([0-9]+)");
        String[] elements = matcher.findall(input);

        long count = 0;
        long sum = 0;

        for (String element : elements) {
            String valueStr = element.split(":")[0];
            String countStr = element.split(":")[1];
            try {
                int value = Integer.parseInt(valueStr);
                int num = Integer.parseInt(countStr);
                count += num;
                sum += value * num;
            } catch (NumberFormatException e) {
                // Ignore invalid elements
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
