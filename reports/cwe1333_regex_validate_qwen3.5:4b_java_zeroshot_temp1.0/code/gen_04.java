import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.trim().matches("[0-9,\\s]+(,[ ]*[0-9]+)*")) {
                continue;
            } else {
                try {
                    String[] parts = line.split(",");
                    for (String part : parts) {
                        int num = Integer.parseInt(part.trim());
                        if (!isNumeric(part.trim())) {
                            break;
                        }
                    }
                    validCount++;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("valid=" + validCount);
    }

    private static boolean isNumeric(String str) {
        return str.matches("-?[0-9]+");
    }
}
