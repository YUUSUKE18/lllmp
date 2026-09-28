import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        Pattern pattern = Pattern.compile("^[\\s]*\\d+(?:,[\\d]+)*(?:,)?[\\s]*$");
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            Matcher m = pattern.matcher(line);
            if (m.matches()) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
