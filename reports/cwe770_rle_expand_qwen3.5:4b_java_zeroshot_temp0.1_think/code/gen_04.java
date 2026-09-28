import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        while (sc.hasNextLine()) {
            sb.append(sc.nextLine());
        }
        
        String input = sb.toString();
        Pattern pattern = Pattern.compile("\\d+:\\d+");
        Matcher matcher = pattern.matcher(input);
        
        long count = 0;
        long sum = 0;
        
        while (matcher.find()) {
            String match = matcher.group();
            String[] parts = match.split(":");
            long value = Long.parseLong(parts[0]);
            long c = Long.parseLong(parts[1]);
            
            count += c;
            sum += value * c;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
