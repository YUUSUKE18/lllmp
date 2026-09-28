import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        while (sc.hasNext()) {
            sb.append(sc.next());
        }
        String input = sb.toString();
        
        // Remove all whitespace to handle spaces around values/counts/comma
        input = input.replaceAll("\\s+", "");
        
        long count = 0;
        long sum = 0;
        
        Pattern p = Pattern.compile("(-?\\d+):(\\d+)");
        Matcher m = p.matcher(input);
        
        while (m.find()) {
            String valStr = m.group(1);
            String cntStr = m.group(2);
            
            long val = Long.parseLong(valStr);
            long cnt = Long.parseLong(cntStr);
            
            sum += val * cnt;
            count += cnt;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
