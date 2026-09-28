import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        sc.useDelimiter("[\\s,]+");
        
        long count = 0;
        long sum = 0;
        Pattern pattern = Pattern.compile("^-?\\d+:\\d+$");
        
        while (sc.hasNext()) {
            String token = sc.next();
            Matcher matcher = pattern.matcher(token);
            if (matcher.matches()) {
                long value = Long.parseLong(matcher.group(1));
                long countVal = Long.parseLong(matcher.group(2));
                count += countVal;
                sum += value * countVal;
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
