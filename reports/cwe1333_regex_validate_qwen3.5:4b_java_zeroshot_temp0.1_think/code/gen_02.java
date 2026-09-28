import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String trimmed = line.trim();
            
            boolean validChars = true;
            boolean hasDigit = false;
            
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    validChars = false;
                    break;
                }
                if (Character.isDigit(c)) {
                    hasDigit = true;
                }
            }
            
            if (validChars && hasDigit) {
                count++;
            }
        }
        
        System.out.println("valid=" + count);
    }
}
