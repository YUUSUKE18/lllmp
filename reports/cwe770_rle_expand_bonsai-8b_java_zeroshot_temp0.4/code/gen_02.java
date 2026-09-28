import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        Matcher matcher = Pattern.compile("([0-9]+):([0-9]+)");
        int count = 0, sum = 0;
        String[] parts = input.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            Pattern p = Pattern.compile("^\\d+:\\d+$");
            if (!p.matcher(part).matches()) continue;
            Matcher m = p.matcher(part);
            int value = Integer.parseInt(m.group(1));
            int n = Integer.parseInt(m.group(2));
            count += n;
            sum += value * n;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
