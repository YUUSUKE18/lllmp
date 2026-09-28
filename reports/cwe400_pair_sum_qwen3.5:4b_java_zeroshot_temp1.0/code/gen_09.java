import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) {
            return;
        }
        
        String targetLine = scanner.nextLine();
        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        int count = 0;
        int lastIndex = -1;
        for (int i = 0; i < scanner.countTokens(); i++) {
            try {
                long value = Long.parseLong(scanner.nextToken());
                if (value == targetValue) {
                    continue;
                } else {
                    long diff = targetValue - value;
                    if (count > 0 && diff != 0 && lastIndex + 1 < count) {
                        // Found a second number that can pair with one of the previous pairs
                        long complement = value * diff / (value - diff);
                        if (complement == targetValue || (value - diff) / diff % value == 0) {
                            count++;
                        }
                    }
                }
            } catch (Exception e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
