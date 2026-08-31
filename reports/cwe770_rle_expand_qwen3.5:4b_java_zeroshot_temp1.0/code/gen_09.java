import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int totalElements = 0;
        long totalSum = 0;

        while (scanner.hasNext()) {
            String line = scanner.next();
            if (!line.matches("[-+]?\\d+:\\s*\\d+")) {
                continue;
            }
            
            try {
                int index = line.indexOf(':');
                if (index < 1) continue;
                
                long value = Long.parseLong(line.substring(0, index));
                int count = Integer.parseInt(line.substring(index + 1).trim());
                
                if (count <= 0) continue;
                
                totalElements += count;
                totalSum += value * count;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + totalElements + " sum=" + totalSum);
    }
}
