import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        // Regex: Start with one or more digits, followed by zero or more (comma + digits), optionally ending with a comma.
        String regex = "^[\\d]+(?:,[\\d]+)*[,]?$";
        Pattern pattern = Pattern.compile(regex);

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String trimmed = line.trim();
            
            Matcher matcher = pattern.matcher(trimmed);
            if (matcher.matches()) {
                count++;
            }
        }
        
        System.out.println("valid=" + count);
    }
}
