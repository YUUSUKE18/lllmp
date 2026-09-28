import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String inputLine = scanner.nextLine();
        int count = 0;
        long sum = 0L;

        Pattern pattern = Pattern.compile("[\\s\\S]*?(\\d+):([0-9]+)");
        Matcher matcher = pattern.matcher(inputLine);

        while (matcher.find()) {
            int value = Integer.parseInt(matcher.group(1));
            int frequency = Integer.parseInt(matcher.group(2));
            
            if (frequency < 0) {
                continue; 
            }
            
            count += frequency;
            sum += (long) value * frequency;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
