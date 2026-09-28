import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalSum = 0;
        long totalCount = 0;
        
        Pattern pattern = Pattern.compile("[-]?\\d+:\\d+");
        
        while (sc.hasNext()) {
            String token = sc.next();
            Matcher matcher = pattern.matcher(token);
            
            while (matcher.find()) {
                String match = matcher.group();
                int colonIndex = match.indexOf(':');
                long val = Long.parseLong(match.substring(0, colonIndex));
                long cnt = Long.parseLong(match.substring(colonIndex + 1));
                
                totalCount += cnt;
                totalSum += val * cnt;
            }
        }
        
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
