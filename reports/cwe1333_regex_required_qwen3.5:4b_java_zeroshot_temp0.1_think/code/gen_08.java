import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        Pattern pattern = Pattern.compile("^[0-9]+(?:,[0-9]*)*$");
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().matches(pattern.pattern())) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
