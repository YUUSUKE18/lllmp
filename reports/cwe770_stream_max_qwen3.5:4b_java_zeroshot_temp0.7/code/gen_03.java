import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        Pattern pattern = Pattern.compile("-?\\d+");
        Matcher matcher = pattern.matcher(line.trim());
        
        int count = 0;
        long maxVal = Long.MIN_VALUE; // Using MIN_VALUE to handle potential empty input or negative numbers properly
        
        while (matcher.find()) {
            String token = matcher.group();
            try {
                long val = Long.parseLong(token);
                if (val > maxVal) {
                    maxVal = val;
                }
                count++;
            } catch (NumberFormatException e) {
                // Ignore cases where parsing fails unexpectedly, though regex should prevent this for valid integers
            }
        }
        
        System.out.println("count=" + count + " max=" + maxVal);
    }
}
