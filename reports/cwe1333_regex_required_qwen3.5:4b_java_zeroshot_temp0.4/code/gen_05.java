import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        String regex = "^\\s*(\\d+(?:,\\d+)*)?\\s*$";
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.matches(regex)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
