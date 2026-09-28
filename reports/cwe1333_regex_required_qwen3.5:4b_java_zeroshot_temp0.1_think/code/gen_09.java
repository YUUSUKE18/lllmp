import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        Pattern pattern = Pattern.compile("^[\\d]+(?:,[\\d]+)*(?:,)?$");

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            if (pattern.matcher(line.trim()).matches()) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
