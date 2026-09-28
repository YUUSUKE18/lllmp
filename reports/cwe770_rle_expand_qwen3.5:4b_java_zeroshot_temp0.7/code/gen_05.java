import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;

        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    continue;
                }
                
                String[] keyValue = part.split(":");
                if (keyValue.length != 2) {
                    continue;
                }
                
                String valueStr = keyValue[0].trim();
                String countStr = keyValue[1].trim();

                try {
                    long value = Long.parseLong(valueStr);
                    long repeat = Long.parseLong(countStr);
                    
                    if (repeat < 0) {
                        continue;
                    }
                    
                    sum += value * repeat;
                    count += repeat;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
