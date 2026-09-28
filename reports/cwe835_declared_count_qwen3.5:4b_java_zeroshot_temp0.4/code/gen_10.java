import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;
        
        int countLine = 0;
        try {
            String line = scanner.nextLine();
            countLine = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            return;
        }

        long sum = 0;
        int actualCount = 0;

        while (scanner.hasNext()) {
            if (scanner.hasNextInt()) {
                int val = scanner.nextInt();
                sum += val;
                actualCount++;
            } else {
                scanner.next(); // Skip non-integer tokens
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
